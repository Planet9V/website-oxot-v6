import { same } from "@/components/industries/registry";
import type { Bilingual } from "@/i18n/bilingual";

/**
 * The dependency graph's data, split out of content.ts because it is the one
 * recursive structure on the page and reads badly inline among flat tables —
 * the same split assurance/iec-62443 makes for content-figures.ts.
 *
 * OXOT_content-to-visual-mapping-table.md line 13 maps "Product
 * dependencies" to a "BOM/dependency graph" and names "generic feature list"
 * as the wrong answer. So the five bills of materials are not five bullets:
 * they are five branches of one asset, and the tree below is the actual
 * nesting BomGraph.tsx renders. Depth is a real property of the data rather
 * than a decoration, which is what lets the figure show the claim content.ts
 * makes — a flaw several libraries deep still resolves back to the
 * controller carrying it.
 *
 * EVERY VALUE IS SYNTHETIC. Part numbers, versions and revisions are
 * invented for the drawing, and the figure says so beside itself. Nothing
 * here describes a real customer estate.
 */

export type BomView = "HBOM" | "SBOM" | "CBOM" | "SaaS-BOM" | "Ops-BOM";

export interface BomNode {
  /** The identifier as it would appear in the record. */
  label: string;
  /** Which of the five views this branch belongs to. Roots only. */
  view?: BomView;
  /** One clause of prose belonging to this node. */
  note?: Bilingual;
  /** Marks the node the worked example is about. Exactly one, deliberately. */
  finding?: Bilingual;
  children?: readonly BomNode[];
}

export const BOM_ASSET = {
  label: "PLC-4102",
  name: same("Dosing controller, treatment line 2"),
  note: same("One asset in the model. Everything below it is a dependency the twin resolved and versioned.")
};

export const BOM_TREE: readonly BomNode[] = [
  {
    label: "Controller chassis rev C",
    view: "HBOM",
    children: [
      { label: "CPU module rev C" },
      { label: "Ethernet comms module rev A" },
      { label: "Analog I/O card rev B" }
    ]
  },
  {
    label: "Firmware 4.2.1",
    view: "SBOM",
    children: [
      {
        label: "Vendor runtime 1.8.0",
        children: [
          {
            label: "Protocol stack 3.0.4",
            children: [
              {
                label: "Compression library 1.2.11",
                finding: same(
                  "Four levels below the asset, and the only place the flaw actually lives. A scanner reporting it against a library name tells nobody which controller stops. The graph does."
                )
              }
            ]
          }
        ]
      },
      { label: "Embedded web interface 2.4.6" }
    ]
  },
  {
    label: "TLS 1.2 · RSA-2048 · SHA-256",
    view: "CBOM",
    note: same("Recorded with its post-quantum exposure, so the migration is a dated plan rather than a surprise.")
  },
  {
    label: "Vendor telemetry endpoint",
    view: "SaaS-BOM",
    note: same("An external service an operational function now depends on to keep working.")
  },
  {
    label: "Remote vendor session, weekly",
    view: "Ops-BOM",
    note: same(
      "How the plant is actually operated. This is the route that turns the library flaw above into a reachable pathway."
    )
  }
];
