/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
    function ListNode(val) {
           this.val = val;
           this.next = null;
       }
    const setA=new Set();
    while (headA) {
        setA.add(headA)
        headA=headA.next
    }

    while (headB) {
        if (setA.has(headB)){
            // console.log('хехе')
            return headB
        }
        // headA=headA.next
        headB=headB.next
    }
    return null
};