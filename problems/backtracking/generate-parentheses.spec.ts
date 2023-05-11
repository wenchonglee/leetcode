import { expect, test } from "vitest";

/**
 * https://leetcode.com/problems/generate-parentheses
 */
function generateParenthesis(n: number): string[] {
  const results: string[] = [];

  const backtrack = (currentString: string, openBraces: number, closeBraces: number) => {
    // Exit condition: if the string has reached the right length, stop iterating
    if (currentString.length === n * 2) {
      results.push(currentString);
      return;
    }

    // If we've not reached n amount of open braces yet, recursively call with a new open brace
    if (openBraces < n) {
      backtrack(currentString + "(", openBraces + 1, closeBraces);
    }

    // If there are more open braces than open braces, recursively call with a new close brace
    if (closeBraces < openBraces) {
      backtrack(currentString + ")", openBraces, closeBraces + 1);
    }
  };

  backtrack("", 0, 0);
  return results;
}

test("sample test cases", async () => {
  expect(generateParenthesis(3)).toIncludeSameMembers(["((()))", "(()())", "(())()", "()(())", "()()()"]);
  expect(generateParenthesis(1)).toIncludeSameMembers(["()"]);
});
