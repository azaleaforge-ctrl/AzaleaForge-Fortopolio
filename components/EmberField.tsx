"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

/** Rising embers for the hero forge atmosphere. Disabled on reduced motion. */
export function EmberField({ count = 20 }: { count?: number }) {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const embers = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 2 + Math.random() * 4,
        duration: 4 + Math.random() * 5,
        delay: Math.random() * 6,
        drift: (Math.random() - 0.5) * 50,
      })),
    [count]
  );

  if (reduce || !mounted) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {embers.map((e) => (
        <motion.span
          key={e.id}
          className="absolute bottom-0 rounded-full"
          style={{
            left: `${e.left}%`,
            width: e.size,
            height: e.size,
            background: "radial-gradient(circle, #ff8a3d, #ff5d8f)",
            boxShadow: "0 0 8px rgba(255,138,61,0.85)",
          }}
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: -560, x: e.drift, opacity: [0, 1, 1, 0] }}
          transition={{
            duration: e.duration,
            delay: e.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}
