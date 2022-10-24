import { expect, test } from "vitest";

/**
 * https://leetcode.com/problems/3sum/
 *
 * Time: O(n^2), because of the nested loop
 */
function threeSum(nums: number[]): number[][] {
  const results = [];

  // sort the array so that we can identify duplicates easier
  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length; i++) {
    // skip the index if it is the same as the previous index
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      // move the right pointer left, if the sum is too big (more than 0)
      if (sum > 0) {
        right -= 1;
        // move the left pointer right, if the sum is too small (smaller than 0)
      } else if (sum < 0) {
        left += 1;
      } else {
        // found a sum that adds to 0, append to result set
        // then, move the left pointer by however many times it is duplicated
        results.push([nums[i], nums[left], nums[right]]);
        left += 1;
        while (nums[left] === nums[left - 1]) {
          left += 1;
        }
      }
    }
  }

  return results;
}

test("example test cases", async () => {
  expect(threeSum([-1, 0, 1, 2, -1, -4])).toIncludeSameMembers([
    [-1, -1, 2],
    [-1, 0, 1],
  ]);
  expect(threeSum([0, 1, 1])).toBeEmpty();
  expect(threeSum([0, 0, 0])).toIncludeSameMembers([[0, 0, 0]]);
});
