# [1114. Print in Order](https://leetcode.com/problems/print-in-order/description/)

**Level:** `Easy`.

**Topics:** `Concurrency`.

Suppose we have a class:

```java
public class Foo {
  public void first() { print("first"); }
  public void second() { print("second"); }
  public void third() { print("third"); }
}
```

The same instance of `Foo` will be passed to three different threads. Thread A will call `first()`, thread B will call `second()`, and thread C will call `third()`. Design a mechanism and modify the program to ensure that `second()` is executed after `first()`, and `third()` is executed after `second()`.

**Note:**

We do not know the order in which the threads are scheduled, and the input format is for testing purposes only.

**Example 1:**

```txt
Input: nums = [1,2,3]
Output: "firstsecondthird"
Explanation: There are three threads being fired asynchronously.
The input [1,2,3] means thread A calls first(), thread B calls second(), and thread C calls third().
"firstsecondthird" is the correct output.
```

**Example 2:**

```txt
Input: nums = [1,3,2]
Output: "firstsecondthird"
Explanation: The input [1,3,2] means thread A calls first(), thread B calls third(), and thread C calls second().
"firstsecondthird" is the correct output.
```

**Constraints:**

- `nums` is a permutation of `[1, 2, 3]`.

## Approach

Chain the three methods with unbuffered channels, so each one blocks until the previous step signals it:

- `second` — waiting channel for `Second()`, `third` — waiting channel for `Third()`.
- `First()` runs `printFirst`, then sends on `second`, waking `Second()`.
- `Second()` receives from `second` (blocks until `First()` is done), runs `printSecond`, then sends on `third`.
- `Third()` receives from `third` (blocks until `Second()` is done), runs `printThird`.

Since the channels are unbuffered, a send also blocks until the receiver is ready, giving a strict `First → Second → Third` ordering regardless of goroutine scheduling. Each method runs exactly once, so the channels never deadlock.

**Time:** `O(1)`.
**Space:** `O(1)`.
