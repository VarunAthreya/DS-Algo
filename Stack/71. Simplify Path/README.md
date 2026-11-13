# [71. Simplify Path](https://leetcode.com/problems/simplify-path/description/)

**Level:** `Medium`.

**Topics:** `String`, `Stack`.

You are given an _absolute_ path for a Unix-style file system, which always begins with a slash `'/'`. Your task is to transform this absolute path into its **simplified canonical path**.

The rules of a Unix-style file system are as follows:

- A single period `'.'` represents the current directory.
- A double period `'..'` represents the previous/parent directory.
- Multiple consecutive slashes such as `'//'` and `'///'` are treated as a single slash `'/'` for this problem.
- Any sequence of periods that does **not match** the rules above should be treated as a **valid directory or file name**. For example, `'...'` and `'....'` are valid directory or file names.

The simplified canonical path should follow these rules:

- The path must start with a single slash `'/'`.
- Directories within the path must be separated by exactly one slash `'/'`.
- The path must not end with a slash `'/'`, unless it is the root directory.
- The path must not have any single or double periods (`'.'` or `'..'`) used to denote current or parent directories.

Return the **simplified canonical path**.

**Example 1:**

```txt
Input: path = "/home/"
Output: "/home"
Explanation:
The trailing slash should be removed.
```

**Example 2:**

```txt
Input: path = "/home//foo/"
Output: "/home/foo"
Explanation:
Multiple consecutive slashes are replaced by a single one.
```

**Example 3:**

```txt
Input: path = "/home/user/Documents/../Pictures"
Output: "/home/user/Pictures"
Explanation:
A double period ".." refers to the directory up a level (the parent directory).
```

**Example 4:**

```txt
Input: path = "/../"
Output: "/"
Explanation:
Going one level up from the root directory is not possible.
```

**Example 5:**

```txt
Input: path = "/.../a/../b/c/../d/./"
Output: "/.../b/d"
Explanation:
"..." is a valid name for a directory in this problem.
```

**Constraints:**

- `1 <= path.length <= 3000`
- `path` consists of English letters, digits, period `'.'`, slash `'/'` or `'_'`.
- `path` is a valid absolute Unix path.

## Approach 1 — Reverse scan with a pending `..` counter

Split on `'/'`, drop the trailing empty piece caused by a trailing slash, then walk the components **right to left**:

- `''` (from `//`) and `'.'` are skipped.
- `'..'` increments `backCnt` — it will cancel the next real directory to its left.
- Any other name: if `backCnt > 0`, this directory is cancelled by an unmatched `..`, so decrement and skip. Otherwise prepend `/<dir>` to the result.

A trailing `..` that reaches the root simply leaves `backCnt` unused, and an empty result means the path collapsed to the root.

- **Time:** `O(n)` — one pass over the components, with `O(1)` amortized prepend cost in practice (`O(n^2)` worst case in theory due to string prepending).
- **Space:** `O(n)`.

## Approach 2 — Stack (forward scan)

Iterate the components left to right and keep only the real directories on a stack: `''`/`'.'` are ignored, `'..'` pops (if non-empty), anything else is pushed. Join with `'/'` and prefix a slash. This is the canonical solution and avoids string prepending.

- **Time:** `O(n)`.
- **Space:** `O(n)`.
