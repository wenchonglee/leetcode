import { expect, test } from "vitest";

/**
 * https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree
 *
 * Make use of the properties of a BST, direct the traversal to the subtree if:
 * - Left subtree if p & q are both smaller
 * - Right subtree if p & q are both larger
 * - Stop and return otherwise (i.e. the lowest ancestor is the current subtree root)
 */
class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

function lowestCommonAncestor(root: TreeNode | null, p: TreeNode, q: TreeNode): TreeNode | null {
  const dfs = (node: TreeNode | null): TreeNode | null => {
    if (node === null) return node;

    if (p.val > node.val && q.val > node.val) {
      return dfs(node.right);
    }

    if (p.val < node.val && q.val < node.val) {
      return dfs(node.left);
    }

    return node;
  };

  return dfs(root);
}

const treeNode8 = new TreeNode(3);
const treeNode9 = new TreeNode(5);
const treeNode5 = new TreeNode(4, treeNode8, treeNode9);

const treeNode4 = new TreeNode(0);
const treeNode2 = new TreeNode(2, treeNode4, treeNode5);

const treeNode6 = new TreeNode(7);
const treeNode7 = new TreeNode(9);
const treeNode3 = new TreeNode(8, treeNode6, treeNode7);

const sampleTree = new TreeNode(6, treeNode2, treeNode3);

test("sample test cases", async () => {
  expect(lowestCommonAncestor(sampleTree, treeNode2, treeNode3)).toEqual(sampleTree);
  expect(lowestCommonAncestor(sampleTree, treeNode2, treeNode5)).toEqual(treeNode2);
});
