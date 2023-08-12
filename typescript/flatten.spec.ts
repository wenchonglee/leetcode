import { expect, test } from "vitest";

/**
 * https://www.greatfrontend.com/questions/javascript/flatten
 */
const flatten = <T>(value: T[]) => {
  const all: T[] = [];
  for (const item of value) {
    if (Array.isArray(item)) {
      all.push(...flatten(item));
    } else {
      all.push(item);
    }
  }

  return all;
};

/**
 * Using a generator, copied from solutions
 */
//  function* flattenG<T>(value: T[]) {
//   for (const item of value) {
//     if (Array.isArray(item)) {
//       yield* flattenG(item);
//     } else {
//       yield item;
//     }
//   }
// }

test("empty array", () => {
  expect(flatten([])).toEqual([]);
  expect(flatten([[], [[]], [[], [[[]]]]])).toEqual([]);
});

test("single-element array", () => {
  expect(flatten([1])).toEqual([1]);
  expect(flatten(["foo"])).toEqual(["foo"]);
  expect(flatten([undefined])).toEqual([undefined]);
});

test("array with only one level", () => {
  expect(flatten([1, 2, 3])).toEqual([1, 2, 3]);
  expect(flatten(["foo", "bar"])).toEqual(["foo", "bar"]);
  expect(flatten([null, true, undefined])).toEqual([null, true, undefined]);
});

test("array with multiple levels of nesting", () => {
  expect(flatten([0, 1, 2, [3, 4]])).toEqual([0, 1, 2, 3, 4]);
  expect(flatten([1, [2, [3]]])).toEqual([1, 2, 3]);
  expect(
    flatten([
      [1, 2],
      [3, 4],
    ])
  ).toEqual([1, 2, 3, 4]);
  expect(flatten(["foo", ["bar"]])).toEqual(["foo", "bar"]);
  expect(flatten([[null, [true]], undefined])).toEqual([null, true, undefined]);
});

test("list-style array", () => {
  expect(flatten([1, [2, [3, [4, [5]]]]])).toEqual([1, 2, 3, 4, 5]);
  expect(flatten([[[[[1], 2], 3], 4], 5])).toEqual([1, 2, 3, 4, 5]);
});

test("deeply-nested single-element array", () => {
  expect(flatten([[[[1]]]])).toEqual([1]);
});
