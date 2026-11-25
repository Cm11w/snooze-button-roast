// Snooze Button Roast — make.fun entry
// Program: writes one roast line about an alarm clock ringing at 6 AM on a
// Saturday to <MAKEFUN_OUTPUT_DIR>/entry.txt (the grader's /output/entry.txt).
// Deterministic: a single fixed string constant. No input, no clock, no
// randomness, no network. Node 22+, standard library only.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The roast. Fresh angle: the alarm clock as a student who crammed for the
// wrong exam — it studied all week for Monday, then rang on Saturday anyway.
// Truthful (the clock follows its schedule, it never learns the day), the
// punchline ("aced the wrong exam") pays off in the last few words, and the
// whole line is sayable out loud in one breath.
const TEXT =
  "My alarm clock studied all week for Monday, then rang at 6 AM on Saturday anyway \u2014 the only student who aced the wrong exam.";

// Gate (from competition.yaml): /output/entry.txt must be UTF-8 text of
// 1 to 200 characters, not only whitespace, a single line. The program
// refuses to write anything if the text ever leaves that gate.
const MAX_CHARS = 200;

function assertGate(text: string): void {
  if (text.length < 1 || text.length > MAX_CHARS) {
    throw new Error(`gate: text is ${text.length} characters, must be 1-200`);
  }
  if (text.trim().length === 0) {
    throw new Error("gate: text is only whitespace");
  }
  if (/[\r\n]/.test(text)) {
    throw new Error("gate: text must be a single line (no CR or LF)");
  }
  if (text !== text.trim()) {
    throw new Error("gate: text must not start or end with whitespace");
  }
  // On-topic guard: the judge's first criterion is that the line roasts an
  // alarm clock ringing at 6 AM on a Saturday, so the text must name the
  // alarm clock, the hour, and the day. If a later edit ever drops one of
  // those, the program fails loudly instead of shipping an off-brief line.
  const lowered = text.toLowerCase();
  for (const required of ["alarm clock", "6 am", "saturday"]) {
    if (!lowered.includes(required)) {
      throw new Error(`gate: text must mention "${required}"`);
    }
  }
  // No lone surrogates: the file must be clean UTF-8.
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);
    if (code >= 0xd800 && code <= 0xdbff) {
      const next = text.charCodeAt(i + 1);
      if (!(next >= 0xdc00 && next <= 0xdfff)) {
        throw new Error("gate: lone high surrogate in text");
      }
    } else if (code >= 0xdc00 && code <= 0xdfff) {
      const prev = text.charCodeAt(i - 1);
      if (!(prev >= 0xd800 && prev <= 0xdbff)) {
        throw new Error("gate: lone low surrogate in text");
      }
    }
  }
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

assertGate(TEXT);
mkdirSync(outputDir, { recursive: true });
// Write the text exactly: no trailing newline, so the file's character
// count is the text's character count.
writeFileSync(join(outputDir, "entry.txt"), TEXT, "utf8");
