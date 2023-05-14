import { expect, test } from "vitest";

/**
 * https://leetcode.com/problems/subarray-sum-equals-k
 *
 * Prefix sum approach
 * - see https://www.youtube.com/watch?v=fFVZt-6sgyo for an illustrated diagram
 *
 */
function subarraySum(nums: number[], k: number): number {
  let result = 0;

  const map: Record<number, number> = {};
  map[0] = 1;

  let sum = 0;
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];

    // We can express the condition like this: k = cumulativeSumEnd - cumulativeSumStart
    // and rearranged to: cumulativeSumStart = cumulativeSumEnd - k
    if (map[sum - k]) {
      console.log(sum, map, map[sum - k]);
      result += map[sum - k];
    }

    map[sum] = map[sum] ? map[sum] + 1 : 1;
  }

  return result;
}

test("example test cases", async () => {
  expect(subarraySum([1, 1, 1], 2)).toBe(2);
  //   expect(subarraySum([1, 2, 3], 3)).toBe(2);
});

/**
 * O(n^2) brute-force
 */
// function subarraySum(nums: number[], k: number): number {
//     let result = 0;

//     for(let i = 0; i < nums.length; i++){
//         let num = nums[i];
//         if(num === k){
//             result +=1;
//         }
//         for(let j = i + 1; j < nums.length; j++){
//             num += nums[j]
//             if(num === k){
//                 result +=1;
//             }
//         }
//     }

//     return result;
// };
