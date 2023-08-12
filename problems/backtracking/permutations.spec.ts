import { expect, test } from "vitest";

/**
 * https://leetcode.com/problems/permutations
 *
 * A typical backtrack algo
 *
 * Recursively call after picking one from the array and passing the spliced array along
 */
function permute(nums: number[]): number[][] {
  const results: number[][] = [];

  const traverse = (current: number[], leftover: number[]) => {
    if (leftover.length === 1) {
      results.push([...current, leftover[0]]);
      return;
    }

    for (let i = 0; i < leftover.length; i++) {
      const curr = [...current, leftover[i]];
      const copy = [...leftover];
      copy.splice(i, 1);
      traverse(curr, copy);
    }
  };

  traverse([], nums);

  return results;
}

test("sample test cases", async () => {
  expect(permute([1, 2, 3])).toIncludeSameMembers([
    [1, 2, 3],
    [1, 3, 2],
    [2, 1, 3],
    [2, 3, 1],
    [3, 1, 2],
    [3, 2, 1],
  ]);
  expect(permute([0, 1])).toIncludeSameMembers([
    [0, 1],
    [1, 0],
  ]);
  expect(permute([1])).toIncludeSameMembers([[1]]);
});
