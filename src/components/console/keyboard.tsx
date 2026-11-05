"use client";

import { useState } from "react";
import type { Project, SkillGroup } from "@/data/types";
import { openProject } from "@/lib/nav";

const GROUP_KEY = ["key-orange", "key-blue", "key-yellow", "key-green", "key-ink"];

/** Projects whose stack mentions a skill (simple, honest string match on the real stack lists). */
function usedIn(skill: string, projects: Project[]) {
  const s = skill.toLowerCase().replace(/\s*\(.*\)$/, "").replace(/\.js$/, "");
  const alias: Record<string, string[]> = {
    javascript: ["javascript", "node.js", "react", "next.js", "express"],
    typescript: ["typescript"],
    "gemini api": ["gemini"],
    "vector dbs": ["embeddings"],
    tailwind: ["tailwind"],
    node: ["node.js", "express"],
    next: ["next.js"],
  };
  const needles = alias[s] ?? [s];
  return projects.filter((p) =>
    [...p.stack, ...p.fallbacks.flatMap((f) => f.chain)].some((x) => needles.some((n) => x.toLowerCase().includes(n))),
  );
}

/** Channel 4: skills as a mechanical keyboard. Press a key to see where it's used. */
export function Keyboard({ groups, projects }: { groups: SkillGroup[]; projects: Project[] }) {
  // Start with a key already pressed so the readout shows what it does.
  const [skill, setSkill] = useState<string | null>("TypeScript");
  const hits = skill ? usedIn(skill, projects) : [];

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
      <div className="chassis p-4 sm:p-6 lg:col-span-8">
        <div className="space-y-4">
          {groups.map((g, gi) => (
            <div key={g.title} className="flex flex-wrap items-center gap-2.5">
              <span className={`key ${GROUP_KEY[gi % GROUP_KEY.length]} pointer-events-none min-w-28 !justify-start font-mono !text-[0.66rem] uppercase tracking-wider`}>
                {g.title}
              </span>
              {g.items.map((s) => (
                <button
                  key={s}
                  type="button"
                  aria-pressed={skill === s}
                  onClick={() => setSkill(skill === s ? null : s)}
                  className="key text-[0.95rem]"
                >
                  {s}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="lcd p-4 sm:p-5 lg:col-span-4" aria-live="polite">
        <p className="text-[1.05rem] text-lcd-dim">KEY READOUT</p>
        {skill ? (
          <>
            <p className="mt-1 text-3xl leading-none">{skill.toUpperCase()}</p>
            {hits.length ? (
              <>
                <p className="mt-3 text-[1.15rem] text-lcd-dim">FOUND IN {hits.length} PROJECT STACK{hits.length > 1 ? "S" : ""}:</p>
                <ul className="mt-1 text-[1.25rem] leading-snug">
                  {hits.map((p) => (
                    <li key={p.slug}>
                      <button type="button" onClick={() => openProject(p.slug)} className="relative z-10 underline decoration-dotted underline-offset-4 hover:no-underline">
                        ▸ {p.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="mt-3 text-[1.15rem] leading-snug">Not in these ten project stacks. It&apos;s on my skills list from work, study or LeetCode.</p>
            )}
          </>
        ) : (
          <p className="mt-2 text-[1.25rem] leading-snug">PRESS ANY KEY<span className="caret" /></p>
        )}
      </div>
    </div>
  );
}
