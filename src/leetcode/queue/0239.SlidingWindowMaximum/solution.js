// Given an array nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position. Return the max sliding window.

// Follow up:
// Could you solve it in linear time?

// Example:

// Input: nums = [1,3,-1,-3,5,3,6,7], and k = 3
// Output: [3,3,5,5,6,7] 
// Explanation: 

// Window position                Max
// ---------------               -----
// [1  3  -1] -3  5  3  6  7       3
//  1 [3  -1  -3] 5  3  6  7       3
//  1  3 [-1  -3  5] 3  6  7       5
//  1  3  -1 [-3  5  3] 6  7       5
//  1  3  -1  -3 [5  3  6] 7       6
//  1  3  -1  -3  5 [3  6  7]      7


// Constraints:

// 1 <= nums.length <= 10^5
// -10^4 <= nums[i] <= 10^4
// 1 <= k <= nums.length

// 方法一： 暴力破解，（超出时间限制）

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {

    // if(!nums) return [];

    let len = nums.length;
    let result = [];

    let curr = 0;

    while (curr !== len - k + 1) {
        let prev = curr;
        let last = prev + k - 1;
        // last - prev = k-1;

        let max = -Infinity;
        while (prev !== last + 1) {
            console.log(nums[prev], max)
            if (nums[prev] > max) {
                max = nums[prev];
            }
            prev++;
        }

        console.log('----')

        result.push(max);

        curr++;
    }

    return result;
};

// 方法二：单调队列（第17个用例超时）

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
    let queque = [];
    let res = [];


    for (let i = 0; i < nums.length; i++) {
        let last = i;
        let prev = i - k + 1;

        // 维护单调递减队列
        let curr = nums[i];
        let tail = nums[queque[queque.length - 1]];

        console.log('ee', queque.length - 1);
        console.log('yy', tail, curr);
        while (tail < curr) {
            queque.pop();
            tail = nums[queque[queque.length - 1]];
        }

        queque.push(i)

        console.log('滑动窗口下标：', prev, last);
        // console.log(prev,last);
        console.log('单调队列下标：', queque);

        // 求滑动窗口的最大值
        if (prev >= 0) {
            let idx = queque[0];
            console.log('xx', queque, idx, prev);
            while (idx < prev) {
                queque.shift();
                idx = queque[0];
            }
            let max = nums[idx];
            res.push(max);
        }
        console.log('窗口最值结果：', res)
        console.log('------------------------')
    }

    return res;
};

// 方法二：单调队列 - 优化版

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
    let len = nums.length;
    let queue = [];
    let res = [];

    for (let i = 0; i < k; i++) {
        while (queue.length && nums[queue[queue.length - 1]] <= nums[i]) {
            queue.pop();
        }
        queue.push(i)
    }

    // i === k
    res.push(nums[queue[0]]);
    console.log(queue, res)


    for (let i = k; i < len; i++) {
        while (queue.length && nums[queue[queue.length - 1]] < nums[i]) {
            queue.pop();
        }
        queue.push(i);

        while (queue.length && queue[0] < i - k + 1) {
            queue.shift();
        }
        res.push(nums[queue[0]]);
    }

    return res;
};

// 方法三：分块 + 预处理(稀疏表类似)

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
    const len = nums.length;
    const prefixMax = new Array(len).fill(0);
    const suffixMax = new Array(len).fill(0);

    for (let i = 0; i < len; i++) {
        if (i % k === 0) {
            prefixMax[i] = nums[i];
        } else {
            prefixMax[i] = Math.max(prefixMax[i - 1], nums[i]);
        }
    }

    for (let i = len - 1; i >= 0; i--) {
        if (i === len || (i + 1) % k === 0) {
            suffixMax[i] = nums[i];
        } else {
            suffixMax[i] = Math.max(suffixMax[i + 1], nums[i])
        }
    }

    const res = [];
    for (let i = 0; i < len - k + 1; i++) {
        res.push(Math.max(prefixMax[i + k - 1], suffixMax[i]));
    }

    return res;
};