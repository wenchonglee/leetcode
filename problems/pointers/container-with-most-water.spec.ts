import { expect, test } from "vitest";

/**
 * https://leetcode.com/problems/container-with-most-water
 *
 * Maintain 2 pointers, starting from both ends
 * - If the height at the left is smaller than the height at the right, move the pointer in from the left
 * - This represents a potential increase in area, because we're keeping the max height between the 2 pointers
 */
function maxArea(height: number[]): number {
  let left = 0;
  let right = height.length - 1;
  let max = 0;

  while (left < right) {
    const w = right - left;
    const h = Math.min(height[left], height[right]);

    max = Math.max(max, w * h);

    if (height[left] <= height[right]) {
      left += 1;
    } else {
      right -= 1;
    }
  }

  return max;
}

test("sample test cases", async () => {
  expect(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])).toBe(49);
  expect(maxArea([1, 1])).toBe(1);
});
