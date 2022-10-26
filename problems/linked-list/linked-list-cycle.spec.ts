import { expect, test } from "vitest";

/**
 * https://leetcode.com/problems/linked-list-cycle/
 *
 * Floyd's Tortoise and hare algo:
 * - Maintain 2 references, the tortoise moves 1 node at a time, while the hare moves 2 node at a time
 * - If they ever "meet", then there is a cycle
 * - Else if they both become null, then there is no cycle
 */
function hasCycle(head: ListNode | null): boolean {
  if (!head?.next) return false;

  let hare: ListNode | null | undefined = head;
  let tortoise: ListNode | null = head;

  while (hare && tortoise) {
    tortoise = tortoise.next;
    hare = hare.next?.next;
    if (hare === tortoise) return true;
  }
  return false;
}

test("sample test cases", async () => {
  /**
   * 3 -> 2 -> 0 -> -4
   *       ^________/
   */
  let item3 = new ListNode(-4);
  const item2 = new ListNode(0, item3);
  const item1 = new ListNode(2, item2);
  const item0 = new ListNode(3, item1);
  item3.next = item1;

  expect(hasCycle(item0)).toBeTrue();
});

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}
