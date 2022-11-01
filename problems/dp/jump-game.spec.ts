import { expect, test } from "vitest";

/**
 * https://leetcode.com/problems/jump-game/
 *
 * This can be solved in a DP way or a greedy way
 * Greedy:
 * - We start from the end and "move the target" from the last index
 * - As long as the current index can reach the latest target, it is solvable
 *
 * DP:
 * - A normal dp solution; after iterating through an index, memoize the results
 */
function canJump(nums: number[]): boolean {
  if (nums.length <= 1) return true;
  if (nums.length === 2) {
    return nums[0] > 0;
  }

  let target = nums.length - 1;
  let ok = false;
  for (let j = nums.length - 2; j >= 0; j--) {
    const canJumpToTarget = j + nums[j] >= target;
    if (canJumpToTarget) {
      target = j;
    }

    ok = canJumpToTarget;
  }

  return ok;
}

function canJumpDp(nums: number[]): boolean {
  if (nums.length === 1) return true;
  const dp: Record<number, boolean> = {};

  const jump = (i: number) => {
    if (dp[i] !== undefined) return dp[i];
    if (i >= nums.length) return false;
    if (i === nums.length - 1) return true;
    for (let j = nums[i]; j >= 1; j--) {
      let index = i + j;
      const res = jump(index);

      if (res) {
        dp[index] = true;
        return true;
      }
    }
    dp[i] = false;
    return false;
  };
  jump(0);

  return dp[nums.length - 1] ?? false;
}

test("sample test cases", async () => {
  expect(canJump([2, 3, 1, 1, 4])).toBeTrue();
  expect(canJump([3, 2, 1, 0, 4])).toBeFalse();
  expect(canJumpDp([2, 3, 1, 1, 4])).toBeTrue();
  expect(canJumpDp([3, 2, 1, 0, 4])).toBeFalse();
});
