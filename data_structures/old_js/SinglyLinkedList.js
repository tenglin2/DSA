/**
 * Singly linked list are an alternative to the common array structure if you really care about insertion and deletion. If you only really care adding or deleting stuff to the front and end, it will be better than the array because you avoid having to shift multiple elements. There are definitely some use cases and the logic behind linked lists are used for several other data structures.
 * The Singly Linked List does the exact same thing as the Doubly Linked List except the nodes do not have a previous pointer, which makes the logic a little more difficult. The advantage is that it consumes less memory.
 * Time Complexity is O(1) for insertions and deletion but O(n) for access and search. The Space Complexity is O(n).
 */
const Node = class {
	constructor(value) {
		this.value = value;
		this.next = null;
	}
};

const SinglyLinkedList = class {
	// Initialize the linked list with null head/tail and 0 length.
	constructor() {
		this.head = null;
		this.tail = null;
		this.length = 0;
	}

	// When we finish pushing, we return a reference to the class itself.
	push(value) {
		// Creating a new node instance with value given.
		let newNode = new Node(value);

		// When the list is already empty...
		if (this.length === 0) {
			this.head = newNode;
			this.tail = this.head;
		} else {
			// Otherwise, just add it to the end of the linked list.
			this.tail.next = newNode;
			this.tail = newNode;
		}

		// Increment the list length.
		this.length += 1;

		// Return a reference to the class.
		return this;
	}

	pop() {
		// In the case where the list is already empty.
		if (this.length === 0) return null;

		// In the case where there is only 1 node inside.
		if (this.length === 1) {
			let poppedNode = this.head;
			this.head = null;
			this.tail = null;
			this.length -= 1; // Should be 0 now.

			return poppedNode;
		}

		// Normal case we need to find the node before the last and set as the new tail. Notice that we use a for loop that ends before this.length - 2. This is because this.length - 2 represent the second last element. We want a loop at the third, but don't want to go to the last element.
		let newTail = this.head;
		for (let i = 0; i < this.length - 2; i++) {
			newTail = newTail.next;
		}

		// Alternative using two variables and a while loop.
		// let currentNode = this.head;
		// let newTail = currentNode;
		// while (currentNode.next) {
		//   newTail = currentNode.next;
		//   currentNode = currentNode.next;
		// }

		// The poppedNode is the tail that we want removed.
		let poppedNode = newTail.next;
		newTail.next = null;
		this.tail = newTail;
		this.length -= 1;

		return poppedNode;
	}

	unshift(value) {
		// In the case where there are no elements in the list
		let newNode = new Node(value);
		if (this.length === 0) {
			this.head = newNode;
			this.tail = this.head;
		} else {
			// Normal case where we push the value into the front of the list.
			newNode.next = this.head;
			this.head = newNode;
		}

		this.length += 1;

		// Return a reference to the class.
		return this;
	}

	shift() {
		// In the case where there are no elements.
		if (this.length === 0) return null;

		// Only one element in the list.
		if (this.length === 1) {
			let shiftedNode = this.head;
			this.head = null;
			this.tail = null;
			this.length -= 1;

			return shiftedNode;
		} else {
			// Normal case where we pop node from the front.
			let shiftedNode = this.head;
			this.head = shiftedNode.next;
			this.length -= 1;

			return shiftedNode;
		}
	}

	insert(value, index) {
		// Validation for the index. Note that we can have an index at this.length index which doesn't exist yet. It is the same as pushing the value.
		if (index < 0 || index > this.length) return null;

		// In the case where index is 0, use unshift().
		if (index === 0) return this.unshift(value);

		// In the case where index is this.length, use push().
		if (index === this.length) return this.push(value);

		// Normal case, we need to find the index before.
		let currentNode = this.head;
		let i = 0;

		// Notice we use index - 1, because after iteration, i will be index - 1 and currentNode will be in the right position. Could have used a for loop instead.
		while (i < index - 1) {
			currentNode = currentNode.next;
			i += 1;
		}

		// Creating the node and assigning it properly.
		let newNode = new Node(value);
		newNode.next = currentNode.next;
		currentNode.next = newNode;
		this.length += 1;

		// Returning a reference to the class.
		return this;
	}

	remove(index) {
		// Validating the index, but this time the index must be between 0 and this.length - 1.
		if (index < 0 || index > this.length - 1) return null;

		// Removing index 0 is shift().
		if (index === 0) return this.shift();

		// Removing index this.length - 1 is pop().
		if (index === this.length - 1) return this.pop();

		// Normal case, we need the node before and the removed node. Same instance, we stop at the node before, but this time we make a variable for the removed one.
		let i = 0;
		let currentNode = this.head;

		// Stop at the node before the removed one. Could have used a for loop instead.
		while (i < index - 1) {
			currentNode = currentNode.next;
			i += 1;
		}

		// Assigning the removedNode to a variable.
		let removedNode = currentNode.next;
		currentNode.next = removedNode.next;
		this.length -= 1;

		// Cleaning up the returned node.
		removedNode.next = null;

		return removedNode;
	}

	reverse() {
		// Reference to the original head.
		let currentNode = this.head;

		// Start off by switching the head and tail.
		[ this.head, this.tail ] = [ this.tail, this.head ];

		let next;
		let prev = null;

		// We loop through this.length iterations which goes through the whole thing. You could have done this when finding the currentNode too since we knew the number of iterations.
		for (let i = 0; i < this.length; i++) {
			// Notice that node starts off as a reference to the original head. Start by defining next and understand that we are basically shifting each time and setting node.next to prev.
			next = currentNode.next;
			currentNode.next = prev;
			prev = currentNode;
			currentNode = next;
		}
	}

	print() {
		// This function is just so that we can see the elements easily. It kind of defeats the purpose to represent it in an array, but it's much simpler to do it that way.
		let printArray = [];
		let currentNode = this.head;

		// Iterate through every node in the linked list.
		while (currentNode) {
			printArray.push(currentNode.value);
			currentNode = currentNode.next;
		}

		// Better to just console log from the method, than to force the user to console log the return value.
		console.log(printArray);

		// Return a reference to the class, though it won't be useful.
		return this;
	}

	size() {
		return this.length;
	}

	empty() {
		return this.length === 0;
	}

	getHead() {
		return this.head;
	}

	getTail() {
		return this.tail;
	}

	valueAt(index) {
		// Validating the index.
		if (index < 0 || index > this.length - 1) return null;

		let currentNode = this.head;

		// Iteration will exactly when i is equal to the index and currentNode is in the correct position. Could have used a while loop, but we know exact iteration count so it's cleaner this way.
		for (let i = 0; i < index; i++) {
			currentNode = currentNode.next;
		}

		return currentNode.value;
	}
};

console.log('hello');

let list = new SinglyLinkedList();

list.push(1);
list.push(5);
list.push(1);
list.push(1);
list.push(5);
list.push(1);
list.shift();
list.unshift(9);
list.unshift(9);
list.remove(4);
list.shift();
list.insert(12, 2);
list.reverse();
console.log(list.valueAt(3));
list.pop();
list.print();
// console.log(list.length);
