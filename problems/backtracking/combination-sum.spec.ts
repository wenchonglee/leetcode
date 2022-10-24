import { expect, test } from "vitest";

/**
 * https://leetcode.com/problems/combination-sum
 *
 * Pretty similar to subsets, the core difference being:
 * - We have more exit conditions (total > target)
 * - The "backtrack" case stays at the same index
 */
function combinationSum(candidates: number[], target: number): number[][] {
  const results: number[][] = [];

  const backtrack = (i: number, curr: number[], total: number) => {
    if (total === target) {
      results.push([...curr]);
      return;
    }

    if (i === candidates.length || total > target) {
      return;
    }

    // add the i-th candidate, stay on i
    curr.push(candidates[i]);
    backtrack(i, curr, total + candidates[i]);

    // progress to the (i+1)th candidate (this subgraph will never include candidate i again)
    curr.pop();
    backtrack(i + 1, curr, total);
  };

  backtrack(0, [], 0);

  return results;
}

test("sample test cases", async () => {
  expect(combinationSum([2, 3, 6, 7], 7)).toIncludeSameMembers([[2, 2, 3], [7]]);
  expect(combinationSum([2, 3, 5], 8)).toIncludeSameMembers([
    [2, 3, 3],
    [3, 5],
    [2, 2, 2, 2],
  ]);
});
