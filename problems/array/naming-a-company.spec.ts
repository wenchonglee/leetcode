import { expect, test } from "vitest";

/**
 * https://leetcode.com/problems/naming-a-company
 */
function distinctNames(ideas: string[]): number {
  const map: Record<string, string[]> = {};
  for (const idea of ideas) {
    const firstChar = idea[0];

    map[firstChar] = map[firstChar] ? [...map[firstChar], idea.substring(1)] : [idea.substring(1)];
  }

  let count = 0;
  for (const char1 of Object.keys(map)) {
    for (const char2 of Object.keys(map)) {
      if (char1 === char2) continue;

      const setSize = new Set([...map[char2], ...map[char1]]).size;
      const intersect = map[char1].length + map[char2].length - setSize;

      const dist1 = map[char1].length - intersect;
      const dist2 = map[char2].length - intersect;
      count += dist1 * dist2;
    }
  }

  return count;
}

test("example test cases", async () => {
  expect(distinctNames(["coffee", "donuts", "time", "toffee"])).toBe(6);
  expect(distinctNames(["lack", "back"])).toBe(0);
});
