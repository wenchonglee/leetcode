import { expect, test } from "vitest";

/**
 * https://leetcode.com/problems/predict-the-winner
 *
 * Keep a memoized 2D array of the results and do a top-down recursion
 */
function predictTheWinner(nums: number[]): boolean {
  const n = nums.length;
  const memo = new Array(n).fill(undefined).map(() => new Array(n).fill(-1));

  const getScore = (left: number, right: number) => {
    if (memo[left][right] !== -1) {
      return memo[left][right];
    }

    if (left === right) {
      return nums[left];
    }

    /**
     * If I (player 1) picked left, then the difference between my score and player 2 would be the value I picked and player 2's picks
     *   i.e. the next turn is player2's call of getScore
     */
    const scoreByLeft = nums[left] - getScore(left + 1, right);
    const scoreByRight = nums[right] - getScore(left, right - 1);

    // Store player 1's score at this game state (left, right subarray)
    memo[left][right] = Math.max(scoreByLeft, scoreByRight);

    return memo[left][right];
  };
  const result = getScore(0, n - 1);

  // If player 1's optimal score is greater than 0, then player 1 wins
  return result >= 0;
}

test("sample test cases", async () => {
  expect(predictTheWinner([1, 5, 2])).toBeFalse();
  expect(predictTheWinner([3, 2, 233, 7])).toBeTrue();
});
