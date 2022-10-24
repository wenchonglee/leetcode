import { expect, test } from "vitest";

/**
 * https://leetcode.com/problems/3sum-closest/
 *
 * Essentially the same as 3sum, but:
 * - Use the target instead of 0
 * - Maintain a "diff" that should be as low as possible
 */
function threeSumClosest(nums: number[], target: number): number {
  let closest = nums[0] + nums[1] + nums[2];
  let closestDiff = Math.abs(target - closest);

  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      let diff = Math.abs(target - sum);
      if (diff < closestDiff) {
        closest = sum;
        closestDiff = diff;
      }

      if (sum > target) {
        right -= 1;
      } else if (sum < target) {
        left += 1;
      } else {
        return target;
      }
    }
  }

  return closest;
}

test("example test cases", async () => {
  expect(threeSumClosest([-1, 2, 1, -4], 1)).toEqual(2);
  expect(threeSumClosest([0, 0, 0], 1)).toEqual(0);
});
