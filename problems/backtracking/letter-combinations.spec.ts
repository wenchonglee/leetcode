import { expect, test } from "vitest";
/**
 * https://leetcode.com/problems/letter-combinations-of-a-phone-number/
 *
 * Same blueprint as a backtrack algo, but fairly bare bones
 */
function letterCombinations(digits: string): string[] {
  const results: string[] = [];
  const digitsArr = Array.from(digits);
  if (digitsArr.length === 0) {
    return [];
  }

  const backtrack = (i: number, curr: string) => {
    if (curr.length === digits.length) {
      results.push(curr);
      return;
    }

    for (const alphabet of map[digitsArr[i]]) {
      backtrack(i + 1, `${curr}${alphabet}`);
    }
  };

  backtrack(0, "");

  return results;
}

const map: Record<string, string[]> = {
  "2": ["a", "b", "c"],
  "3": ["d", "e", "f"],
  "4": ["g", "h", "i"],
  "5": ["j", "k", "l"],
  "6": ["m", "n", "o"],
  "7": ["p", "q", "r", "s"],
  "8": ["t", "u", "v"],
  "9": ["w", "x", "y", "z"],
};

test("sample test cases", async () => {
  expect(letterCombinations("23")).toIncludeSameMembers(["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"]);
  expect(letterCombinations("2")).toIncludeSameMembers(["a", "b", "c"]);
});
