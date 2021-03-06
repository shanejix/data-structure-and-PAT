// Given a singly linked list, determine if it is a palindrome.

// Example 1:

// Input: 1->2
// Output: false
// Example 2:

// Input: 1->2->2->1
// Output: true
// Follow up:
// Could you do it in O(n) time and O(1) space?

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

// 利用回文链表的对称性

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function (head) {
    let newHead = reverseList(head);

    while (head && newHead) {

        if (head.val !== newHead.val) {
            return false;
        }
        head = head.next;
        newHead = newHead.next;
    }

    return true
};

function reverseList(head) {
    let newHead = new ListNode(0);
    let curr = head;
    while (curr) {
        let insert = new ListNode(curr.val);
        insert.next = newHead.next;
        newHead.next = insert;
        curr = curr.next;
    }
    return newHead.next;
}

// 利用对称性，快慢指针

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function (head) {
    let mid = middleNode(head);
    let newHead = mid && reverseList(mid.next);

    while (newHead !== null) {
        if (head.val !== newHead.val) {
            return false
        }
        newHead = newHead.next;
        head = head.next;
    }

    return true
};

function reverseList(head) {
    if (!head || !head.next) {
        return head
    }

    let newHead = reverseList(head.next);
    head.next.next = head;
    head.next = null;
    return newHead;
}

function middleNode(head) {
    let slow = fast = head;
    let prev = null;

    while (fast && fast.next) {
        prev = slow;
        slow = slow.next
        fast = fast.next.next
    }

    return prev;
}

function middleNodeOptmization(head) {
    let slow = fast = head;

    while (fast.next !== null && fast.next.next !== null) {
        slow = slow.next
        fast = fast.next.next
    }

    return slow;
}


var isPalindromeOptmization = function (head) {
    let mid = middleNodeOptmization(head);
    let newHead = mid && reverseList(mid.next);

    let result = true;
    let p = newHead;
    while (result && newHead !== null) {
        if (head.val !== newHead.val) {
            return false
        }
        newHead = newHead.next;
        head = head.next;
    }

    if (mid) mid.next = reverseList(p)

    return result;
};