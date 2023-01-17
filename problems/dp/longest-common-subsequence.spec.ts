import { expect, test } from "vitest";

/**
 * https://leetcode.com/problems/longest-common-subsequence/
 *
 * Work backwards from the end of the 2D array
 * - If the characters match, then add 1 and the diagonal right
 * - Else, take the max of the bottom or right 
 *
        [      a  c  e
          a  [ 3, 2, 1, 0 ],
          b  [ 2, 2, 1, 0 ],
          c  [ 2, 2, 1, 0 ],
          d  [ 1, 1, 1, 0 ],
          e  [ 1, 1, 1, 0 ],
             [ 0, 0, 0, 0 ]
        ]
 */
function longestCommonSubsequence(text1: string, text2: string): number {
  // instantiate an array of arrays with + 1 each axis
  const dp: number[][] = [...new Array(text1.length + 1)].map((x) => new Array(text2.length + 1).fill(0));

  for (let i = text1.length - 1; i >= 0; i--) {
    for (let j = text2.length - 1; j >= 0; j--) {
      if (text1[i] === text2[j]) {
        dp[i][j] = 1 + dp[i + 1][j + 1];
      } else {
        dp[i][j] = Math.max(dp[i][j + 1], dp[i + 1][j]);
      }
    }
  }

  return dp[0][0];
}

test("sample test cases", async () => {
  expect(longestCommonSubsequence("abcde", "ace")).toBe(3);
  expect(longestCommonSubsequence("abc", "abc")).toBe(3);
  expect(longestCommonSubsequence("abc", "def")).toBe(0);
});
