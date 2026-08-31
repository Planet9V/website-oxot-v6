"use client";

/**
 * The single ask on /contact.
 *
 * ACCESSIBILITY, WHICH THE PREVIOUS VERSION HAD TO BE TOLD ABOUT TWICE:
 *
 *  - `required` is on the fields that are required, so assistive technology
 *    announces the constraint before the reader fills the field, not after.
 *  - The form is `noValidate` ON PURPOSE. Native validation bubbles are not
 *    announced consistently, cannot be styled, and vanish on the next
 *    keystroke. Turning them off lets one `role="alert"` summary own the
 *    failure — and that summary takes focus, so a screen-reader user is put on
 *    the problem instead of being left where they were.
 *  - Success is a `role="status"` region that also takes focus. A screen-reader
 *    user must not get silence at the exact moment the page's job completes.
 *
 * PERSISTENCE IS NOT WIRED. This posts to /api/contact, which validates and
 * logs. Nothing is stored and nobody is notified. That is stated in the build
 * report and it is stated to the reader below the button, because promising a
 * two-working-day reply from a route that only logs would be the worst kind of
 * copy on this site.
 */

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { OXOT, say } from "@/content/claims";
import { CONTACT } from "./claims";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/en";

interface Fields {
  name: string;
  email: string;
  organisation: string;
  role: string;
  industry: string;
  country: string;
  decision: string;
  message: string;
}

type Errors = Partial<Record<keyof Fields, string>>;

const EMPTY: Fields = {
  name: "",
  email: "",
  organisation: "",
  role: "",
  industry: "",
  country: "",
  decision: "",
  message: ""
};

/** Owner-supplied, contact.md's "Select your decision" list — kept as a
 *  plain array here rather than a dictionary lookup, since the value posted
 *  to /api/contact must be a stable key regardless of which locale rendered
 *  the label. */
const DECISION_OPTIONS = [
  "otRisk",
  "segmentation",
  "patch",
  "productSecurity",
  "railway",
  "airGapped",
  "supplier",
  "other"
] as const;

const DECISION_LABEL: Record<(typeof DECISION_OPTIONS)[number], (t: Dictionary["form"]) => string> = {
  otRisk: (t) => t.decisionOtRisk,
  segmentation: (t) => t.decisionSegmentation,
  patch: (t) => t.decisionPatch,
  productSecurity: (t) => t.decisionProductSecurity,
  railway: (t) => t.decisionRailway,
  airGapped: (t) => t.decisionAirGapped,
  supplier: (t) => t.decisionSupplier,
  other: (t) => t.decisionOther
};

/** Deliberately loose. The purpose is to catch a typo, not to adjudicate
 *  RFC 5322 — a form that rejects a valid address is worse than one that
 *  accepts an invalid one, because only the first loses the lead. */
function looksLikeEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
}

function validate(f: Fields, c: Dictionary["form"]): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = c.errName;
  if (!f.email.trim()) e.email = c.errEmail;
  else if (!looksLikeEmail(f.email)) e.email = c.errEmailShape;
  if (!f.message.trim()) e.message = c.errMessage;
  return e;
}

export function ContactForm({
  locale,
  t
}: {
  locale: Locale;
  /* The form slice only. A client component's props are serialized into the
     RSC payload; handing it the whole dictionary would ship every page's copy
     to render one form. */
  t: Dictionary["form"];
}) {
  /** A literal prefix, not `useId()`. React 19 ids contain guillemets, which
   *  are illegal in a URL fragment — and the error summary's whole job is to
   *  link to the field that failed. There is one contact form per page. */
  const uid = "contact";
  /* claims.ts is already in this component's bundle (CONTACT.email), so
     resolving these here costs nothing extra and keeps the page from having to
     hand three sentences down as separate props. */
  const writtenReview = say(OXOT.writtenReview, locale);
  const whoReplies = say(CONTACT.whoReplies, locale);
  const yoursToForward = say(OXOT.yoursToForward, locale);

  const [fields, setFields] = useState<Fields>({ ...EMPTY });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");

  const summaryRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  /**
   * Focus is moved in an effect, not in a `requestAnimationFrame` callback.
   * rAF is throttled in background and offscreen frames, so the one moment
   * this page must not be silent — the moment the reader submits — is exactly
   * the moment rAF is least reliable. An effect runs after the commit that
   * rendered the target, every time. Measured: with rAF, `document.activeElement`
   * stayed on <body> after both submit paths.
   */
  const wantFocus = useRef<null | "summary" | "status">(null);
  const honeypot = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!wantFocus.current) return;
    const target = wantFocus.current === "status" ? statusRef.current : summaryRef.current;
    wantFocus.current = null;
    target?.focus();
  });

  const set = (k: keyof Fields) => (ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFields((prev) => ({ ...prev, [k]: ev.target.value }));

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const found = validate(fields, t);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus("idle");
      wantFocus.current = "summary";
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        // locale in the BODY: the route used to read it from a query string
        // this form never sent, so every Dutch lead was filed as English —
        // and the reply is written from that row.
        body: JSON.stringify({ ...fields, locale, website: honeypot.current?.value ?? "" })
      });
      if (!res.ok) throw new Error(String(res.status));
      /*
       * READ THE FLAG. The route returns 200 {persisted:false} when the insert
       * fails, under a comment promising "we do not silently pretend a row
       * landed" — and this line used to do exactly that, showing "We have it."
       * on a database failure. The route's honesty contract was defeated one
       * file away.
       */
      const body = (await res.json().catch(() => null)) as { persisted?: boolean } | null;
      setStatus(body?.persisted === false ? "failed" : "sent");
      wantFocus.current = body?.persisted === false ? "summary" : "status";
    } catch {
      setStatus("failed");
      wantFocus.current = "summary";
    }
  }

  if (status === "sent") {
    return (
      <div
        ref={statusRef}
        role="status"
        tabIndex={-1}
        className="rounded-lg border border-primary bg-card p-6 outline-none sm:p-8"
      >
        <p className="oxot-kicker">{t.receivedKicker}</p>
        <h2 className="mt-3">{t.receivedHeading}</h2>
        <p className="prose-measure mt-4">{writtenReview}</p>
        <p className="prose-measure mt-3 text-muted-foreground">
{whoReplies} {t.receivedNote}
        </p>
        <p className="mt-4 text-sm text-muted-foreground">{yoursToForward}</p>
      </div>
    );
  }

  const errorList = (Object.keys(errors) as (keyof Fields)[]).filter((k) => errors[k]);
  const showSummary = errorList.length > 0 || status === "failed";

  return (
    <form onSubmit={onSubmit} noValidate className="max-w-xl">
      {showSummary && (
        <div
          ref={summaryRef}
          role="alert"
          tabIndex={-1}
          className="mb-6 rounded-lg border border-destructive bg-card p-5 outline-none"
        >
          <h3 className="text-destructive">
            {status === "failed" ? t.failedHeading : t.invalidHeading}
          </h3>
          {status === "failed" ? (
            <p className="mt-2 text-sm">
              {t.failedLead}{" "}
              <a className="text-primary-ink underline underline-offset-4" href={`mailto:${CONTACT.email.en}`}>
                {CONTACT.email.en}
              </a>
              .
            </p>
          ) : (
            <ul className="mt-2 space-y-1 text-sm">
              {errorList.map((k) => (
                <li key={k}>
                  <a className="text-primary-ink underline underline-offset-4" href={`#${uid}-${k}`}>
                    {errors[k]}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <fieldset className="mb-7">
        <legend className="font-medium">
          {t.decisionHeading}
          <span className="mono-label ml-2">{t.optional}</span>
        </legend>
        <div className="mt-3 space-y-2.5">
          {DECISION_OPTIONS.map((key) => (
            <label key={key} className="flex cursor-pointer items-center gap-2.5 body-copy">
              <input
                type="radio"
                name={`${uid}-decision`}
                value={key}
                checked={fields.decision === key}
                onChange={set("decision")}
                className="h-4 w-4 accent-primary"
              />
              {DECISION_LABEL[key](t)}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="space-y-5">
        <Field
          optionalLabel={t.optional}
          requiredLabel={t.required}
          requiredFieldLabel={t.requiredField}
          id={`${uid}-name`}
          label={t.labelName}
          required
          value={fields.name}
          onChange={set("name")}
          error={errors.name}
          autoComplete="name"
        />
        <Field
          optionalLabel={t.optional}
          requiredLabel={t.required}
          requiredFieldLabel={t.requiredField}
          id={`${uid}-email`}
          label={t.labelEmail}
          type="email"
          required
          value={fields.email}
          onChange={set("email")}
          error={errors.email}
          autoComplete="email"
          help={t.helpEmail}
        />
        <Field
          optionalLabel={t.optional}
          requiredLabel={t.required}
          requiredFieldLabel={t.requiredField}
          id={`${uid}-organisation`}
          label={t.labelOrganisation}
          optional
          value={fields.organisation}
          onChange={set("organisation")}
          autoComplete="organization"
        />
        <Field
          optionalLabel={t.optional}
          requiredLabel={t.required}
          requiredFieldLabel={t.requiredField}
          id={`${uid}-role`}
          label={t.labelRole}
          optional
          value={fields.role}
          onChange={set("role")}
          autoComplete="organization-title"
          help={t.helpRole}
        />
        <Field
          optionalLabel={t.optional}
          requiredLabel={t.required}
          requiredFieldLabel={t.requiredField}
          id={`${uid}-industry`}
          label={t.labelIndustry}
          optional
          value={fields.industry}
          onChange={set("industry")}
        />
        <Field
          optionalLabel={t.optional}
          requiredLabel={t.required}
          requiredFieldLabel={t.requiredField}
          id={`${uid}-country`}
          label={t.labelCountry}
          optional
          value={fields.country}
          onChange={set("country")}
          autoComplete="country-name"
        />
        <Field
          optionalLabel={t.optional}
          requiredLabel={t.required}
          requiredFieldLabel={t.requiredField}
          id={`${uid}-message`}
          label={t.labelMessage}
          required
          multiline
          value={fields.message}
          onChange={set("message")}
          error={errors.message}
          help={t.helpMessageEmpty}
        />
      </div>


      {/* Honeypot, mirroring the report gate. Off-screen rather than

          display:none — some bots skip hidden fields but fill positioned

          ones. A filled value gets a plausible success and no row. */}

      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">

        <label>

          Website

          <input ref={honeypot} name="website" tabIndex={-1} autoComplete="off" />

        </label>

      </div>


      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-7 inline-flex items-center rounded-md bg-primary px-5 py-3 font-medium text-on-accent transition-transform duration-150 ease-brand hover:-translate-y-0.5 focus-visible:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-60"
      >
        {status === "sending" ? t.sending : t.submit}
      </button>
      <p className="mt-3 text-sm text-muted-foreground">
{t.submitNote}
        </p>
        {/* Article 13 in one sentence, where the data is actually handed over.
            The form collects name, work email, employer, role and free text and
            now stores it, so the reader is told before they submit — not in a
            policy page nobody opens. */}
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {t.privacyNote}
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  help,
  type = "text",
  required = false,
  optional = false,
  multiline = false,
  autoComplete,
  optionalLabel,
  requiredLabel,
  requiredFieldLabel
}: {
  id: string;
  label: string;
  value: string;
  onChange: (ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  help?: string;
  type?: string;
  required?: boolean;
  optional?: boolean;
  multiline?: boolean;
  autoComplete?: string;
  optionalLabel: string;
  requiredLabel: string;
  requiredFieldLabel: string;
}) {
  const helpId = help ? `${id}-help` : undefined;
  const errId = error ? `${id}-error` : undefined;
  const describedBy = [helpId, errId].filter(Boolean).join(" ") || undefined;

  const shared = {
    id,
    name: id,
    value,
    onChange,
    required,
    autoComplete,
    "aria-invalid": error ? (true as const) : undefined,
    "aria-describedby": describedBy,
    className: `mt-2 w-full rounded-md border bg-background px-3.5 py-2.5 transition-colors duration-150 ease-brand ${
      error ? "border-destructive" : "border-input"
    }`
  };

  return (
    <div>
      <label htmlFor={id} className="block font-medium">
        {label}
        {optional && <span className="mono-label ml-2">{optionalLabel}</span>}
        {required && (
          <span className="mono-label ml-2 text-primary-ink">
            {requiredLabel}
            <span className="sr-only">{requiredFieldLabel}</span>
          </span>
        )}
      </label>
      {multiline ? <textarea rows={6} {...shared} /> : <input type={type} {...shared} />}
      {help && (
        <p id={helpId} className="mt-1.5 text-sm text-muted-foreground">
          {help}
        </p>
      )}
      {error && (
        <p id={errId} className="mt-1.5 text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
