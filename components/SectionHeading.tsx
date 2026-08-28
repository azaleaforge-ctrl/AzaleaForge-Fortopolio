"use client";

import type { ReactNode } from "react";
import { Reveal } from "@/lib/anim";
import { ForgeMark } from "./ForgeMark";

/** Shared section eyebrow + heading + optional intro. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <div
        className={`flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`}
      >
        <ForgeMark className="h-5 w-5 text-azalea" />
        <span className="text-xs font-semibold uppercase tracking-[0.28em] text-muted">
          {eyebrow}
        </span>
      </div>
      <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-text md:text-5xl">
        {title}
      </h2>
      {intro && (
        <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">
          {intro}
        </p>
      )}
    </Reveal>
  );
}
