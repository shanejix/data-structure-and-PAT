// Given the root of a binary tree, return the inorder traversal of its nodes' values.

//  

// Example 1:


// Input: root = [1,null,2,3]
// Output: [1,3,2]
// Example 2:

// Input: root = []
// Output: []
// Example 3:

// Input: root = [1]
// Output: [1]
// Example 4:


// Input: root = [1,2]
// Output: [2,1]
// Example 5:


// Input: root = [1,null,2]
// Output: [1,2]
//  

// Constraints:

// The number of nodes in the tree is in the range [0, 100].
// -100 <= Node.val <= 100
//  

// Follow up:

// Recursive solution is trivial, could you do it iteratively?

//  

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

// 方法一：递归

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function (root) {

    if (root === null) return [];

    const res = [];

    if (root.left) {
        res.push(...inorderTraversal(root.left));
    }

    res.push(root.val);

    if (root.right) {
        res.push(...inorderTraversal(root.right))
    }

    return res;

};


/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */


// 方法一：递归，优化

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function (root) {

    const res = [];

    function inorder(root) {
        if (!root) {
            return;
        }

        inorder(root.left);
        res.push(root.val);
        inorder(root.right);
    }

    inorder(root);

    return res
};


/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

// 方法二：迭代

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function (root) {

    const stack = [];
    const res = [];

    while (root || stack.length) {
        // left tree
        while (root) {
            stack.push(root)
            root = root.left;
        }

        // current root
        root = stack.pop();
        res.push(root.val);

        // right tree
        root = root.right
    }

    return res
};