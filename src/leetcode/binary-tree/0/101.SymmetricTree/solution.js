// Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).

//  

// Example 1:


// Input: root = [1,2,2,3,4,4,3]
// Output: true
// Example 2:


// Input: root = [1,2,2,null,3,null,3]
// Output: false
//  

// Constraints:

// The number of nodes in the tree is in the range [1, 1000].
// -100 <= Node.val <= 100
//  

// Follow up: Could you solve it both recursively and iteratively?

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function (root) {
    if (!root) return false;

    if (!root.left && !root.right) return true;

    let left = toString(root.left)
    let right = toString(root.right);

    console.log(left, right)

    if (left.length === right.length) {
        let l = left.length - 2;
        let r = 0;

        while (l) {

            if (left[l] !== right[r]) {
                return false
            }
            l -= 2
            r += 2
        }

        return true;
    } else {
        return false
    }

};

function toString(node) {
    if (!node) return '#!';

    return res = toString(node.left) + node.val + '!' + toString(node.right)
}