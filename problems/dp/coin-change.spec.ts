import { expect, test } from "vitest";

/**
 * https://leetcode.com/problems/coin-change/
 *
 * Bottom-up approach
 * For each i up until the amount, look up each coin:
 * - replace the dp array with the min between (current min coins) and (1 + min coins of the difference with this coin))
 *
 * e.g. [1,2,5]
 * dp[0]=0
 * dp[1]=1 (from the coin array)
 * dp[2]=1 (from the coin array)
 * dp[3]=1 + dp[2] = 2 (1+2)
 * dp[4]=1 + dp[2] = 2 (2+2)
 * dp[5]=1 (from the coin array)
 * dp[6]=1 + dp[5] = 2 (1+5)
 * dp[7]=1 + dp[3] = 2 (3+4)
 * ...
 *
 */
function coinChange(coins: number[], amount: number): number {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (let i = 1; i < amount + 1; i++) {
    for (const coin of coins) {
      if (i - coin >= 0) {
        dp[i] = Math.min(dp[i], 1 + dp[i - coin]);
      }
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
}

test("sample test cases", async () => {
  expect(coinChange([1, 2, 5], 11)).toBe(3);
  expect(coinChange([2], 3)).toBe(-1);
});

/**
 *
 * Initial attempt - time exceeded
 *
 */
function coinChangeBruteForce(coins: number[], amount: number): number {
  let min = Infinity;
  const dfs = (i: number, numberOfCoins: number, sum: number) => {
    if (i === coins.length || sum > amount) return;

    if (sum === amount) {
      min = Math.min(min, numberOfCoins);
    }

    dfs(i, numberOfCoins + 1, sum + coins[i]);
    dfs(i + 1, numberOfCoins, sum);
  };
  dfs(0, 0, 0);

  return min === Infinity ? -1 : min;
}
