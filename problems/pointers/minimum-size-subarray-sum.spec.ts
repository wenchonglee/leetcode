import { expect, test } from "vitest";

/**
 * https://leetcode.com/problems/minimum-size-subarray-sum
 * Simple 2 pointers O(n)
 */
function minSubArrayLen(target: number, nums: number[]): number {
  let left = 0;
  let right = 0;

  let sum = nums[0];
  let min = Infinity;

  while (left !== nums.length) {
    if (sum >= target) {
      min = Math.min(min, right - left + 1);
      sum -= nums[left];
      left += 1;
    } else {
      right += 1;
      sum += nums[right];
      if (right > nums.length) {
        break;
      }
    }
  }

  return min === Infinity ? 0 : min;
}

test("sample test cases", async () => {
  expect(minSubArrayLen(7, [2, 3, 1, 2, 4, 3])).toBe(2);
  expect(minSubArrayLen(4, [1, 4, 4])).toBe(1);
  expect(minSubArrayLen(11, [1, 1, 1, 1, 1, 1, 1, 1])).toBe(0);
  expect(minSubArrayLen(7, [1, 1, 1, 1, 7])).toBe(1);
});

// * Brute force with prefix sum: O(n^2)

// function minSubArrayLen(target: number, nums: number[]): number {
//     const prefixSum = []
//     let currentSum = 0;
//     for(const num of nums){
//         currentSum += num;
//         prefixSum.push(currentSum);
//     }

//     let min =  Infinity
//     for(let i = 0; i < nums.length; i ++){
//         for(let j = i; j < nums.length; j ++){
//             if(prefixSum[j] - prefixSum[i] + nums[i] >= target){
//                 min = Math.min(j - i + 1, min)
//                 break;
//             }
//         }
//     }
//     if(min === Infinity) return 0;
//     return min
// };
