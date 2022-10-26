import { expect, test } from "vitest";

/**
 * https://leetcode.com/problems/course-schedule-ii/
 *
 * Topological sort
 * - Build a map of { [pre-requisite]: [course] }
 * - Also build an array of where the index = course id and value = how many pre-requisites it has
 *   e.g. [0,0,1] = course-2 has 1 pre-requisite course, the others have none
 * - Populate a queue with all courses that has no pre-requisites
 * - Then, iteratively decrement from the array
 */
function findOrder(numCourses: number, prerequisites: number[][]): number[] {
  const order = [];
  const queue: number[] = [];
  const graph: Record<number, number[]> = {};
  const indegree = Array(numCourses).fill(0);

  // Build the map and array
  for (const [e, v] of prerequisites) {
    if (v in graph) {
      graph[v].push(e);
    } else {
      graph[v] = [e];
    }
    indegree[e]++;
  }

  // Populate the queue
  for (let i = 0; i < indegree.length; i++) {
    if (indegree[i] === 0) queue.push(i);
  }

  const answer: number[] = [];
  while (queue.length) {
    const v = queue.shift()!;
    // for each course in the queue, find its entry in the graph
    if (v in graph) {
      // the entry in the graph will have all courses that requires this course, so we can decrement from the array accordingly
      for (const e of graph[v]) {
        indegree[e]--;
        if (indegree[e] === 0) queue.push(e); // if the array element becomes empty, add it to the queue
      }
    }
    answer.push(v);
    order.push(v);
  }

  return numCourses === order.length ? answer : [];
}

test("sample test cases", async () => {
  expect(findOrder(2, [[1, 0]])).toStrictEqual([0, 1]);
  expect(
    findOrder(4, [
      [1, 0],
      [2, 0],
      [3, 1],
      [3, 2],
    ])
  ).toStrictEqual([0, 1, 2, 3]);
});
