import { expect, test } from "vitest";

/**
 * https://leetcode.com/problems/kth-largest-element-in-an-array
 *
 * Lifted from another submission, an easier to understand version of "Quick Select"
 *
 * 1) Choose a pivot
 * 2) Iterate over the nums array and separate a list that is larger than pivot, equal to pivot, smaller than pivot
 * 3) If k is smaller than the length of the left, it means that k must be in the left list
 *   - e.g. given k = 2 and this is the split: [6, 5] [4] [2, 3, 1]
 *   - We then iterate again through the left list with the same k value
 * 4) If k is larger than both mid and left, it means that k must be in the right list
 *   - We iterate again through the right list with k - left - mid
 *   - e.g. given k = 4 and this is the split: [6, 5] [4] [2, 3, 1]
 *     - We "move" k to become 1, since [6,5,4] altogether are no longer relevant
 * 5) Return any of the mid list if neither conditions are true
 *   - e.g. given k = 2 and this is the split: [6] [5] [4, 2, 3, 1]
 */
function findKthLargest(nums: number[], k: number): number {
  const pivot = nums[Math.floor(Math.random() * nums.length)];

  const leftList = nums.filter((num) => Number(num) > pivot);
  const midList = nums.filter((num) => Number(num) === pivot);
  const rightList = nums.filter((num) => Number(num) < pivot);

  const leftLength = leftList.length;
  const midLength = midList.length;

  if (k <= leftLength) {
    return findKthLargest(leftList, k);
  } else if (k > leftLength + midLength) {
    return findKthLargest(rightList, k - leftLength - midLength);
  }

  return midList[0];
}

test("example test cases", async () => {
  expect(findKthLargest([3, 2, 1, 5, 6, 4], 2)).toBe(5);
  expect(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)).toBe(4);
  expect(findKthLargest([99, 99], 1)).toBe(99);
});
