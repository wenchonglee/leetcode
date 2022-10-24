import { expect, test } from "vitest";

/**
 * https://leetcode.com/problems/subsets/
 *
 * Picture the permutation problem as a graph problem
 *                 []
 *               /    \
 *            [1]      []
 *           /  \     /  \
 *        [1,2] [1]  [2] []
 *       /  \      ...
 *   [1,2,3] [1,2]  ...
 *
 * -> For every element, we branch to add or ignore the element
 */
function subsets(nums: number[]): number[][] {
  let results: number[][] = [];
  let subset: number[] = [];

  const backtrack = (i: number) => {
    if (i === nums.length) {
      results.push([...subset]);
      return;
    }

    // add the element
    subset.push(nums[i]);
    backtrack(i + 1);

    // "backtrack" and ignore the element
    subset.pop();
    backtrack(i + 1);
  };

  backtrack(0);
  return results;
}

test("backtracking", async () => {
  expect(subsets([1, 2, 3])).toIncludeSameMembers([[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]);
  expect(subsets([0])).toIncludeSameMembers([[], [0]]);
});

// alternate iterative answer
function subsetsIterative(nums: number[]): number[][] {
  let results = [[nums[0]], []];
  for (let i = 1; i < nums.length; i++) {
    let newSet = [];
    for (let j = 0; j < results.length; j++) {
      newSet.push(results[j]);
      newSet.push([...results[j], nums[i]]);
    }
    results = [...newSet];
  }

  return results;
}

test("iterative", async () => {
  expect(subsetsIterative([1, 2, 3])).toIncludeSameMembers([[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]);
  expect(subsetsIterative([0])).toIncludeSameMembers([[], [0]]);
});
