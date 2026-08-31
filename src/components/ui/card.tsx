import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * MODIFIED FROM THE SHADCN DEFAULT — design system §0.3, and this is mandatory.
 *
 * Every default Card lifts on hover. It is BASE-COMPONENT behaviour applied
 * exactly once here, never re-implemented per card: the moment three call
 * sites hand-roll their own lift, the durations drift apart and the set stops
 * reading as one system.
 *
 * Two deliberate departures from the stock className:
 *   rounded-2xl, not rounded-xl — 16px is the signature "elevated surface"
 *     radius (§2.3). rounded-md stays the button/input radius.
 *   motion-reduce:* — the lift is transform-based, so a reader who has asked
 *     for less motion gets the colour and shadow change and none of the travel.
 */
function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "flex flex-col gap-6 rounded-2xl border bg-card py-6 text-card-foreground shadow-sm",
        "transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:shadow-primary/5",
        "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      /* Role 4 of the heading scale (§3). CardTitle renders a <div>, so it
         never picks up the h1-h6 base rule and has to name its role. */
      className={cn("h-card", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
