import type { SVGProps } from "react";

/** Stylized anvil — the AzaleaForge mark. Uses currentColor. */
export function ForgeMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
      {/* horn */}
      <path
        d="M3 13 L11 13 L11 15 L3 15 Q1.5 15 1.5 14 Q1.5 13 3 13 Z"
        fill="currentColor"
      />
      {/* top face */}
      <rect x="9" y="11" width="20" height="4" rx="1.2" fill="currentColor" />
      {/* waist */}
      <path d="M14 15 L24 15 L22 21 L16 21 Z" fill="currentColor" />
      {/* base */}
      <rect x="12" y="21" width="13" height="4" rx="1.2" fill="currentColor" />
    </svg>
  );
}
