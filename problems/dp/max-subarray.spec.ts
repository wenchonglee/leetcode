import { expect, test } from "vitest";

/**
 * https://leetcode.com/problems/maximum-subarray/
 *
 * Maintain a "max so far" variable.
 * For example if we use [-2, 1, -3, 4]:
 * - At "1", the "max so far" is 1.  (-2 + 1) vs 1
 * - At "-3", the "max so far" is -2. (-3 + 1) vs -3
 * - At "4", the "max so far" is 4. (-2 + 4) vs 4
 * ..etc
 * Whenever we find a new max, save it in another variable
 */
function maxSubArray(nums: number[]): number {
  let lastMax = nums[0];
  let finalMax = nums[0];

  for (let i = 1; i < nums.length; i++) {
    lastMax = Math.max(lastMax + nums[i], nums[i]);
    finalMax = Math.max(finalMax, lastMax);
  }

  return finalMax;
}

test("sample test cases", async () => {
  expect(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])).toBe(6);
  expect(maxSubArray([1])).toBe(1);
  expect(maxSubArray([5, 4, -1, 7, 8])).toBe(23);
});
