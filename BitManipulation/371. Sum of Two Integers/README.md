# [371. Sum of Two Integers](https://leetcode.com/problems/sum-of-two-integers/description/)

**Level:** `Medium`.

**Topics:** `Math`, `Bit Manipulation`.

Given two integers `a` and `b`, return _the sum of the two integers without using the operators_ `+` _and_ `-`.

**Example 1:**

```txt
Input: a = 1, b = 2
Output: 3
```

**Example 2:**

```txt
Input: a = 2, b = 3
Output: 5
```

**Constraints:**

- `-1000 <= a, b <= 1000`

## Approach

Mimic a full adder with bitwise ops, repeating until there is no carry left:

- `a ^ b` — sum of the bits that do not generate a carry.
- `(a & b) << 1` — the carry, shifted to the next position.
- Assign `a = a ^ b`, `b = carry` and repeat. When `b` becomes `0` (no carry), `a` holds the answer.

**Time:** `O(1)` — at most ~32 iterations.
**Space:** `O(1)`.
