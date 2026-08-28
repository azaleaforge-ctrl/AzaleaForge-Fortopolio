"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useSfx } from "@/lib/sfx";
import type { ElementType, ReactNode } from "react";

export const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Reliable scroll-reveal. Uses IntersectionObserver (NOT framer's whileInView,
  * which fails to fire for elements already in view at load, the cause of the
 * "empty sections on refresh" bug). A safety timeout guarantees content can
 * never stay hidden. Plays enter/leave SFX.
 */
export function useReveal<T extends HTMLElement = HTMLElement>() {
  const [shown, setShown] = useState(false);
  const nodeRef = useRef<T | null>(null);

  const setRef = useCallback((node: T | null) => {
    nodeRef.current = node;
  }, []);

  useEffect(() => {
    const el = nodeRef.current;
    if (!el) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) {
      setShown(true);
      return;
    }
    let done = false;
    const reveal = () => {
      if (done) return;
      done = true;
      setShown(true);
    };
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) reveal();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -5% 0px" }
    );
    io.observe(el);
    const t = window.setTimeout(reveal, 1400); // safety net
    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, []);

  return { setRef, shown };
}

/** Scroll-triggered visual reveal (no SFX). */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "li" | "article";
}) {
  const reduce = useReducedMotion();
  const { setRef, shown } = useReveal<HTMLElement>();
  const MotionTag = motion[as] as ElementType;
  return (
    <MotionTag
      ref={setRef}
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      animate={shown || reduce ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.65, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}

type BtnProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  sound?: boolean;
} & Record<string, unknown>;

/** Animated button or link with built-in SFX. Renders <a> when href given. */
export function SfxButton({
  children,
  className = "",
  href,
  onClick,
  variant = "primary",
  sound = true,
  ...rest
}: BtnProps) {
  const sfx = useSfx();
  const base =
    "group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-transform duration-200 will-change-transform hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azalea/60";
  const styles =
    variant === "primary"
      ? "bg-gradient-to-r from-azalea to-ember text-ink shadow-[0_10px_30px_-10px_rgba(255,93,143,0.6)]"
      : "border border-line bg-surface/60 text-text hover:border-azalea/50";

  const handlers = sound
    ? {
        onMouseEnter: () => sfx.play("hover"),
        onClick: () => {
          sfx.play("click");
          onClick?.();
        },
      }
    : { onClick };

  const content = (
    <>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={`${base} ${styles} ${className}`}
        whileTap={{ scale: 0.97 }}
        {...handlers}
        {...rest}
      >
        {content}
      </motion.a>
    );
  }
  return (
    <motion.button
      type="button"
      className={`${base} ${styles} ${className}`}
      whileTap={{ scale: 0.97 }}
      onClick={handlers.onClick}
      onMouseEnter={sound ? () => sfx.play("hover") : undefined}
      {...rest}
    >
      {content}
    </motion.button>
  );
}

/** Mute toggle for the header. */
export function SoundToggle({ className = "" }: { className?: string }) {
  const { muted, toggleMuted } = useSfx();
  return (
    <button
      type="button"
      aria-label={muted ? "Nyalakan suara" : "Matikan suara"}
      onClick={toggleMuted}
      className={`grid h-10 w-10 place-items-center rounded-full border border-line bg-surface/60 text-muted transition-colors hover:text-text ${className}`}
    >
      {muted ? "🔇" : "🔊"}
    </button>
  );
}
