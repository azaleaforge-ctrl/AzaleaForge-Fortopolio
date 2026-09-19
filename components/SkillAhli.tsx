"use client";

import { Reveal } from "@/lib/anim";
import { SectionHeading } from "./SectionHeading";

const SKILLS = [
  { name: "HTML", level: "expert" as const, desc: "Semantic markup, accessibility, SEO-ready structure" },
  { name: "CSS", level: "expert" as const, desc: "Modern layout (Grid/Flex), animations, responsive design systems" },
  { name: "JavaScript", level: "expert" as const, desc: "ES6+, async patterns, DOM mastery, performance optimization" },
  { name: "Next.js", level: "expert" as const, desc: "App Router, Server Components, SSR/SSG/ISR, middleware, edge" },
  { name: "Laravel", level: "proficient" as const, desc: "Eloquent ORM, queues, broadcasting, API resources, testing" },
  { name: "PHP", level: "proficient" as const, desc: "Modern PHP 8+, Composer, PSR standards, dependency injection" },
  { name: "WordPress", level: "expert" as const, desc: "Custom themes, blocks (Gutenberg), ACF, WooCommerce, headless" },
];

function SkillBar({ level }: { level: "expert" | "proficient" }) {
  const isExpert = level === "expert";
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <div
            key={n}
            className={`h-2 w-6 rounded transition-colors ${
              isExpert
                ? n <= 5
                  ? "bg-azalea"
                  : "bg-line"
                : n <= 4
                ? "bg-ember"
                : "bg-line"
            }`}
          />
        ))}
      </div>
      <span className="text-xs font-medium uppercase tracking-wider text-muted">
        {isExpert ? "Ahli" : "Lumayan paham"}
      </span>
    </div>
  );
}

function SkillCard({ skill, index }: { skill: typeof SKILLS[number]; index: number }) {
  const isExpert = skill.level === "expert";
  return (
    <Reveal key={skill.name} delay={index * 0.06} y={30}>
      <div
        className={`group relative flex flex-col rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 ${
          isExpert
            ? "border-azalea/30 bg-azalea/5 hover:border-azalea/50 hover:shadow-[0_20px_40px_-20px_rgba(255,93,143,0.4)]"
            : "border-ember/30 bg-ember/5 hover:border-ember/50 hover:shadow-[0_20px_40px_-20px_rgba(255,140,66,0.4)]"
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-lg font-semibold text-text">
              {skill.name}
            </h3>
            <p className="mt-1.5 text-sm text-muted leading-relaxed">
              {skill.desc}
            </p>
          </div>
          <span
            className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
              isExpert
                ? "bg-azalea/15 text-azalea ring-1 ring-azalea/20"
                : "bg-ember/15 text-ember ring-1 ring-ember/20"
            }`}
          >
            {isExpert ? "Ahli" : "Lumayan"}
          </span>
        </div>
        <div className="mt-5">
          <SkillBar level={skill.level} />
        </div>
      </div>
    </Reveal>
  );
}

export function SkillAhli() {
  return (
    <section id="skill-ahli" className="py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Skill & Ahli"
          title="Teknologi yang sudah ditempa, bukan sekadar diketahui."
          intro="Dari frontend hingga backend, CMS hingga framework modern. Fokus pada kualitas kode, performa, dan pengalaman developer yang menyenangkan."
          align="center"
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SKILLS.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted max-w-xl mx-auto">
            "Ahli" = sudah handle project production end-to-end, bisa arsitektur & mentoring.
            "Lumayan paham" = paham konsep & syntax, bisa bangun fitur, masih belajar best practice lanjutan.
            Transparansi biar kamu tenang, bukan sekadar jualan.
          </p>
        </div>
      </div>
    </section>
  );
}