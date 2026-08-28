"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ForgeMark } from "./ForgeMark";

/** The "forge core": a spinning grinding-wheel ring around a pulsing ember. */
export function ForgeCore() {
  const reduce = useReducedMotion();
  return (
    <div className="relative grid h-72 w-72 place-items-center sm:h-80 sm:w-80">
      {/* ambient glow */}
      <div className="absolute h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(255,93,143,0.35),rgba(255,138,61,0.12)_55%,transparent_72%)] blur-xl" />

      {/* spinning grinding ring */}
      <motion.div
        className="absolute h-72 w-72 rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, rgba(255,93,143,0.85) 40deg, rgba(255,138,61,0.85) 95deg, transparent 145deg, transparent 360deg)",
          maskImage:
            "radial-gradient(circle, transparent 58%, black 60%, black 72%, transparent 74%)",
          WebkitMaskImage:
            "radial-gradient(circle, transparent 58%, black 60%, black 72%, transparent 74%)",
        }}
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      />

      {/* inner disc */}
      <div className="absolute h-44 w-44 rounded-full border border-line bg-surface/70 backdrop-blur-sm" />

      {/* pulsing ember core */}
      <motion.div
        className="absolute h-24 w-24 rounded-full"
        style={{
          background: "radial-gradient(circle, #ff8a3d, #ff5d8f)",
        }}
        animate={reduce ? undefined : { scale: [1, 1.08, 1], opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      <ForgeMark className="relative h-12 w-12 text-ink" />
    </div>
  );
}
