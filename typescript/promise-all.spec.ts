import { expect, test } from "vitest";

/**
 * https://www.greatfrontend.com/questions/javascript/promise-all
 */
function promiseAll<T>(iterable: T[]) {
  return new Promise((resolve, reject) => {
    const promises = new Array(iterable.length).fill(undefined);

    if (iterable.length === 0) {
      resolve([]);
    }

    let completedCounter = 0;

    iterable.forEach(async (promise, index) => {
      try {
        const result = await promise;
        promises[index] = result;
        completedCounter += 1;

        if (completedCounter === iterable.length) {
          resolve(promises);
        }
      } catch (err) {
        reject(err);
      }
    });
  });
}

test("instant", async () => {
  const p0 = Promise.resolve(2);
  const p1 = Promise.resolve(3);

  const res = await promiseAll([p0, p1]);
  expect(res).toEqual([2, 3]);
});

test("delayed", async () => {
  const p0 = Promise.resolve(2);
  const p1 = new Promise((resolve) => {
    setTimeout(() => {
      resolve(3);
    }, 10);
  });

  const res = await promiseAll([p0, p1]);
  expect(res).toEqual([2, 3]);
});

test("mixture", async () => {
  const p0 = new Promise((resolve) => {
    setTimeout(() => {
      resolve(2);
    }, 10);
  });
  const p1 = Promise.resolve(3);
  const p2 = 4;

  const res = await promiseAll([p0, p1, p2]);
  expect(res).toEqual([2, 3, 4]);
});

test("many delayed", async () => {
  const p0 = new Promise((resolve) => {
    setTimeout(() => {
      resolve(1);
    }, 200);
  });
  const p1 = new Promise((resolve) => {
    setTimeout(() => {
      resolve(2);
    }, 100);
  });
  const p2 = new Promise((resolve) => {
    setTimeout(() => {
      resolve(3);
    }, 10);
  });

  const res = await promiseAll([p0, p1, p2]);
  expect(res).toEqual([1, 2, 3]);
});

test("instant resolve delayed reject", async () => {
  const p0 = Promise.resolve(42);
  const p1 = new Promise((_, reject) => {
    setTimeout(() => {
      reject(2);
    }, 10);
  });

  await expect(promiseAll([p0, p1])).rejects.toBe(2);
});
