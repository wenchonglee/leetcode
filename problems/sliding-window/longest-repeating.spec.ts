import { expect, test } from "vitest";

/**
 * https://leetcode.com/problems/longest-repeating-character-replacement
 */
function characterReplacement(s: string, k: number): number {
  // Maintain 2 pointers and a map of character:count
  const countMap: Record<string, number> = {};

  let results = 0;
  let left = 0;

  for (let right = 0; right < s.length; right++) {
    // increment the map as we iterate
    countMap[s[right]] = 1 + (countMap[s[right]] ?? 0);

    // move left pointer if the window is valid, i.e. the entire window can be made into a single character string
    //   (right - left + 1) = total amount of characters
    //   Math.max(...Object.values(countMap)) = max number of characters in current map
    //   > k = if we can replace the string with k number of characters
    while (right - left + 1 - Math.max(...Object.values(countMap)) > k) {
      countMap[s[left]] -= 1;
      left += 1;
    }

    results = Math.max(results, right - left + 1);
  }

  return results;
}

test("sample test cases", async () => {
  expect(characterReplacement("ABAB", 2)).toBe(4);
  expect(characterReplacement("AABABBA", 1)).toBe(4);
  expect(characterReplacement("AAAA", 0)).toBe(4);
});

// time limit exceeded and doesn't cover all k = 0 cases
function characterReplacementBackTracking(s: string, k: number): number {
  let answer = 0;
  const chars = Array.from(new Set(Array.from(s)));

  const dfs = (char: string, i: number, count: number, len: number) => {
    if (i === s.length) {
      answer = Math.max(len, answer);
      return;
    }

    if (s[i] === char) {
      dfs(char, i + 1, count, len + 1);
      return;
    } else if (count === k) {
      answer = Math.max(len, answer);
      return;
    }
    if (count !== k) {
      // assume we change it
      dfs(char, i + 1, count + 1, len + 1);
    }

    // we don't change it
    dfs(char, i + 1, count, 0);
  };

  for (const char of chars) {
    dfs(char, 0, 0, 0);
  }

  return answer;
}
