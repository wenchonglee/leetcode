import { expect, test } from "vitest";

/**
 * https://leetcode.com/problems/non-overlapping-intervals/
 * O(nlogn)
 *
 * First sort the array, e.g. [1, 2], [2, 3], [3, 4], [1, 3] -> [1, 2], [1, 3], [2, 3], [3, 4]
 * Then, take a greedy approach:
 * - If the last interval overlapped with the current interval (last end vs current start):
 *   - Add that to the count
 *   - Update the "last interval end"
 *
 * e.g. [1, 2], [1, 3]
 *   - Where (2 > 1)
 *   - "last interval end" is now min(2,3)
 */
function eraseOverlapIntervals(intervals: number[][]): number {
  intervals.sort((a, b) => a[0] - b[0]);

  let count = 0;
  let previousEnd = intervals[0][1];

  for (let i = 1; i < intervals.length; i++) {
    const currentStart = intervals[i][0];
    const currentEnd = intervals[i][1];

    if (previousEnd > currentStart) {
      count += 1;
      previousEnd = Math.min(previousEnd, currentEnd);
    } else {
      previousEnd = currentEnd;
    }
  }
  return count;
}

test("example test cases", async () => {
  expect(
    eraseOverlapIntervals([
      [1, 2],
      [2, 3],
      [3, 4],
      [1, 3],
    ])
  ).toBe(1);
  expect(
    eraseOverlapIntervals([
      [1, 2],
      [1, 2],
      [1, 2],
    ])
  ).toBe(2);
  expect(
    eraseOverlapIntervals([
      [1, 2],
      [2, 3],
    ])
  ).toBe(0);
});
