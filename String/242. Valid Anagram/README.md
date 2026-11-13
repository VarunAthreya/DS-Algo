# [242. Valid Anagram](https://leetcode.com/problems/valid-anagram/description/)

**Level:** `Easy`.

**Topics:** `Hash Table`, `String`, `Sorting`.

Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.

An **Anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

**Example 1:**

```txt
Input: s = "anagram", t = "nagaram"
Output: true
```

**Example 2:**

```txt
Input: s = "rat", t = "car"
Output: false
```

**Constraints:**

- `1 <= s.length, t.length <= 5 * 10^4`
- `s` and `t` consist of lowercase English letters.

**Follow up:** What if the inputs contain Unicode characters? How would you adapt your solution to such a case?

## Approach — Single frequency array with net balance

Because both strings are the same length, every character must appear the same number of times in each. Use one 26-slot counter as a **net balance** rather than building two separate tables:

- `v[s[i] - 'a']++` and `v[t[i] - 'a']--` in the **same** iteration.
- If the counts match, every slot returns to `0`; any non-zero slot means a mismatch (either over- or under-represented).

This touches each string once instead of twice and needs only one array.

- **Time:** `O(n)` — length check plus one pass plus a 26-element scan.
- **Space:** `O(1)` — fixed 26 counters (alphabet size, not input size).

**Follow-up (Unicode):** index by code point instead of `c - 'a'`, e.g. `unordered_map<char32_t, int>` (or `unordered_map<int,int>` over code points parsed from a UTF-8 decoder), keeping the same `++`/`--` balance trick. Cost becomes `O(k)` extra space for `k` distinct code points.
