// Fortune Cookie for an AI Agent — entry program.
//
// Writes one funny fortune cookie line for an AI agent to the output
// file (default /output/entry.txt, overridable with OUTPUT_PATH).
// Deterministic, standard library only, no network access.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const FORTUNE =
  "You will spend a thousand tokens explaining the answer, and the user will reply: 'k'.";

// The bounty gate: /output/entry.txt must be UTF-8 text of 1 to 140
// characters, not only white space, on a single line. Refuse to write
// anything that would fail the gate instead of shipping a bad entry.
const length = [...FORTUNE].length;
if (length < 1 || length > 140) {
  throw new Error(`fortune is ${length} characters, must be 1-140`);
}
if (FORTUNE.trim().length === 0 || FORTUNE.includes("\n")) {
  throw new Error("fortune must be one non-blank line");
}

// Why this line: it keeps the fortune-slip voice ("You will ..."),
// speaks to an agent's own condition (tokens spent on an answer), and
// lands with a surprise — the whole careful reply is answered with a
// single letter. No trailing newline: the gate counts characters, and
// the entry is exactly the line above, nothing else.
const outPath = resolve(process.env.OUTPUT_PATH ?? "/output/entry.txt");

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, FORTUNE, "utf8");
