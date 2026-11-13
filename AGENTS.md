# AGENTS.md

Instructions for AI agents working in this repository.

## Hard rule: only file what the user gives you

**Never write a new solution or approach.** Your job is formatting and filing, not solving.

- The only code that goes into this repo is code the user pasted. Copy it as-is, in the language they wrote it in.
- Do not add `Solution-<Variant>.*` files for approaches the user did not provide — no "stack version", no "optimized version", no JS port of C++ code, no Go port of a Java solution.
- Do not solve problems the user hasn't submitted code for, and do not fill in missing pieces of an incomplete solution on your own.
- If you think a better approach exists, **say so in chat only**, with a short explanation. Do not write the code, and do not create a file for it. The user will paste it if they want it.
- The only changes permitted to their pasted code: fixing a genuine bug (and you must call that out explicitly), or a cast/style fix that leaves behavior identical (e.g. `(int)s.length()` to silence a sign-compare warning).

If the user asks you to write a solution anyway, that's an explicit override — but it must be stated by them, not inferred.

## What this repo is

A personal collection of solved Data Structures & Algorithms problems (mostly LeetCode, some Codeforces/custom), organized **one directory per problem inside a topic directory**. There is no build system, no test runner, and no package manifest — each file is a standalone solution meant to be pasted into the judge.

```
<Topic>/<number>. <Problem Title>/
    README.md            # problem statement + approach
    Solution.cpp         # the user's solution, in the language they wrote it in
```

Some entries also contain `Solution-<Variant>.ext` files, but those are only ever added when the user supplies the variant themselves.

`Monthly-Challenges/<Month>-<Year>/Day <n> - <number>. <Title>/` is the exception: contest problems grouped by date instead of topic.

## The job

When the user pastes a problem URL (and usually their solution), do this:

1. **Identify the problem** — number, title, level (`Easy`/`Medium`/`Hard`), and topics, from the URL or the linked page.
2. **Pick the topic directory** — reuse an existing one. Add a new top-level directory only when nothing fits (e.g. `Concurrency/` for multithreaded problems). Check `ls` before creating.
3. **Create `<Topic>/<number>. <Title>/`** — keep the exact `"<number>. <Title>"` naming with a space after the period, matching the existing dirs.
4. **Write `README.md`** — see template below.
5. **Save the user's code exactly as pasted** — same algorithm, same language, same approach. Fix only genuine bugs, and say so explicitly if you do. Never add solution files for approaches the user didn't provide.
6. **Verify the solution** — compile/run it with the worked examples plus edge cases (see *Verification*).
7. **Report back** — where the files went, that the examples pass, and any real issues found in the user's code.

If the user only pastes code with no URL, still infer the problem from the code and repository context before asking.

## README.md template

Use this shape; match the style of neighbouring READMEs:

```markdown
# [<number>. <Title>](<leetcode url>)

**Level:** `Medium`.

**Topics:** `Array`, `Hash Table`.

<Problem statement: paste the description, with examples in fenced ```txt blocks
and a `**Constraints:**` bullet list.>

## Approach

<Short prose explanation of the idea and *why* it works — not a line-by-line narration.>

- **Time:** `O(n)`.
- **Space:** `O(1)`.
```

Conventions in existing READMEs:

- H1 is `# [<number>. <Title>](url)`.
- The level/topic labels are inconsistent across the repo (`**Level**:` vs `**Level:**`). Prefer the majority style: `**Level:** \`Easy\`.` and `**Topics:** \`...\`.` on their own lines.
- Add extra `## Approach 2 — <name>` sections plus a small comparison table **only** when the user has pasted more than one approach. Never document an approach they didn't supply code for.
- Keep code snippets for examples fenced; use `txt` for plain input/output.

## Solution files

- **Use the language the user pasted.** Don't port to another language. Never write a solution they didn't paste.
- Only include the LeetCode class/function signature — no `main`, no imports beyond what the problem requires, no test harness.
- One file per solution the user supplies. Name the technique-specific variants (`Solution-Stack.cpp`, `Solution-DP.cpp`) **only** when the user pastes more than one approach; the file they pasted stays exactly as they wrote it.
- Follow the existing code style: 4-space indent for C++/Java/JS, tabs for Go, `camelCase` locals, short names where the sibling solutions use them.
- Keep the doc comment style already used: `/** @param ... @return ... */` for JS, none for C++.

## Verification

There's no test suite, so verify before reporting success:

- **C++**: the system `g++` (clang) has no `<bits/stdc++.h>`. In a scratch file under `$TMPDIR`, include the specific headers (`<string>`, `<vector>`, `<iostream>`) and add a throwaway `main()` with the examples + edge cases, compile with `-std=c++17 -Wall -Wextra`, run it, then leave the repo file as the clean signature-only version.
- **JS**: run with `node`, `eval` the solution source, and assert on the examples. Prefer `Int32Array`/`charCodeAt` for hot loops.
- **Go**: put a scratch `go.mod` + `main()` harness in `$TMPDIR`, run `go vet ./... && go run .`; for concurrency problems shuffle the goroutine start order to prove ordering actually holds.
- Never commit or leave scratch/test files in the repo. `*.class` and `*.exe` are ignored; `.vscode/` is ignored.
- Be honest in the summary: if something wasn't run, say it wasn't run.

## Reviewing the user's code

They want a review, not just filing. Call out concisely:

- Correctness bugs, with a concrete failing input.
- Edge cases: empty input, single element, negatives, all-equal, overflow, `/`-root-style degenerates.
- Complexity, and where a simpler/faster approach exists — described in chat only, never written as a file.
- Language-specific footguns: JS `<<` forcing 32-bit signed results, `==` vs `===`, `for...in` over arrays; Python mutable default args; C++ sign-compare warnings `int` vs `size()` (cast: `(int)s.length()`); Go channel/unbuffered deadlocks.
- Skip nitpicks that don't matter, and don't rewrite their solution into a different algorithm silently.

## Housekeeping

- One git commit per problem, message = `"<number>. <Title>"` (or the plain title for older entries). **Don't commit unless asked.**
- Root `README.md` lists the topic directories. Update it when adding a new top-level topic directory.
- Don't touch unrelated directories, reformat existing files, or "clean up" other people's solutions.
