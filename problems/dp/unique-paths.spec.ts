import { expect, test } from "vitest";

/**
 * https://leetcode.com/problems/unique-paths
 *
 * Build an array with all ones
 * - The leftmost column and topmost row can be kept to 1 because there is only 1 way to them (the robot can only move right or bottom)
 * - The rest of the cells is the sum of the cell directly above and left of it
 *
 * e.g.
 * [1, 1, 1]
 * [1, 2, 3] where 2 = 1 + 1   3 = 2 + 1, ...etc
 */
function uniquePaths(m: number, n: number): number {
  const arr = Array.from(Array(m), () => new Array(n).fill(1));

  for (let mIndex = 1; mIndex < m; mIndex++) {
    for (let nIndex = 1; nIndex < n; nIndex++) {
      arr[mIndex][nIndex] = arr[mIndex - 1][nIndex] + arr[mIndex][nIndex - 1];
    }
  }

  return arr[m - 1][n - 1];
}

test("sample test cases", async () => {
  expect(uniquePaths(3, 7)).toBe(28);
  expect(uniquePaths(3, 2)).toBe(3);
});
