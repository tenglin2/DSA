/**
 * Singly Linked List.
 * A linked list can be used to simulate the behavior of a stack, queue, and other linear data structures. Advantage over an array is constant time O(1) insertion or removal at the ends, but linear O(n) access.
 */
const ListNode = class {
	constructor(value) {
		this.value = value;
		this.next = null;
	}
};

const LinkedList = class {
	constructor() {
		this.head = null;
		this.tail = null;
		this.size = 0;
	}

	size() {
		return this.size;
	}

	empty() {
		return this.size === 0;
	}

	valueAt(index) {
		if (index < 0 || index >= this.size) return null;
		let counter = 0;
		let currentNode = this.head;
		while (counter < index) {
			currentNode = currentNode.next;
			counter += 1;
		}
		return currentNode.value;
	}

	valueAtEnd(reverseIndex) {
		if (reverseIndex < 0 || reverseIndex >= this.size) return null;
		let index = this.size - 1 - reverseIndex;

		let valueEnd = this.valueAt(index);

		return valueEnd;
	}

	// Push a value to the front.
	unshift(value) {
		let newNode = new ListNode(value);
		if (this.size === 0) {
			this.head = newNode;
			this.tail = newNode;
			this.size += 1;
		}
		newNode.next = this.head;
		this.head = newNode;
		this.size += 1;
	}

	push(value) {
		let newNode = new ListNode(value);
		if (this.size === 0) {
			this.head = newNode;
			this.tail = newNode;
			this.size += 1;
		} else {
			this.tail.next = newNode;
			this.tail = newNode;
			this.size += 1;
		}
	}

	// Pop the front.
	shift() {
		if (this.size < 1) return null;
		let shiftedValue;
		if (this.size === 1) {
			shiftedValue = this.head.value;
			this.head = null;
			this.tail = null;
			this.size = 0;
			return shiftedValue;
		} else {
			shiftedValue = this.head.value;
			let temp = this.head;
			this.head = temp.next;
			this.size -= 1;
			return shiftedValue;
		}
	}

	pop() {
		if (this.size < 1) return null;
		let poppedValue;
		if (this.size === 1) {
			poppedValue = this.tail.value;
			this.head = null;
			this.tail = null;
			this.size = 0;
			return poppedValue;
		} else {
			poppedValue = this.tail.value;
			let temp = this.head;

			// temp holds the second last node as new tail.
			while (temp.next.next !== null) {
				temp = temp.next;
			}

			temp.next = null;
			this.tail = temp;
			this.size -= 1;

			return poppedValue;
		}
	}

	head() {
		return this.head;
	}

	tail() {
		return this.tail;
	}

	insert(index, value) {
		// node cannot be inserted into invalid index.
		if (index < 0 || index > this.size) return null;

		let newNode = new ListNode(value);

		// We want the node right before the index.
		let counter = 0;
		let currentNode = this.head;
		while (counter < index - 1) {
			currentNode = currentNode.next;
			counter += 1;
		}
		// For index of 1, counter will stay 0. For index of 2 counter will increment once. Meaning counter will always be index - 1 after iteration. Meaning the currentnode is the node before the index you want to insert.
		if (this.tail === currentNode) {
			// The new node is implied null next pointer.
			currentNode.next = newNode;
			this.tail = newNode;
			this.size += 1;
		} else {
			newNode.next = currentNode.next;
			currentNode.next = newNode;
			this.size += 1;
		}

		return true;
	}

	erase(index) {
		// Invalid index.
		if (index < 0 || index > this.size - 1) return null;

		if (index === 0) this.shift();
		else if (index === this.size - 1) this.pop();
		else {
			let counter = 0;
			let currentNode = this.head;

			// Stops before the erased node.
			while (counter < index - 1) {
				currentNode = currentNode.next;
				counter += 1;
			}

			let temp = currentNode;
			currentNode.next = temp.next.next;
		}

		return true;
	}

	// Core logic is for each node, have a temp node for both prev and next, then reassign next pointer.
	reverse() {
		let currentNode = this.head;
		let prev = null;
		let next;

		[ this.head, this.tail ] = [ this.tail, this.head ];

		while (currentNode != null) {
			next = currentNode.next;
			currentNode.next = prev;
			prev = currentNode;
			currentNode = next;
		}
	}

	removeValue(value) {
		if (this.head.value === value) {
			let removedValue = this.shift();
			return removedValue;
		} else if (this.tail.value === value) {
			let removedValue = this.pop();
			return removedValue;
		}

		let currentNode = this.head;
		// Last check is second to last, but ends iteration as last element.
		while (currentNode.next != null) {
			if (currentNode.next.value === value) {
				let removedValue = currentNode.next.value;
				let temp = currentNode.next;
				currentNode.next = temp.next;

				this.size -= 1;
				return removedValue;
			}

			currentNode = currentNode.next;
		}

		return null;
	}

	// Iterate through each node until you encounter a null.
	print() {
		let currentNode = this.head;
		while (currentNode != null) {
			console.log(currentNode.value);
			currentNode = currentNode.next;
		}
	}
};

console.log('hello');
let linkedList = new LinkedList();
linkedList.push(1);
linkedList.push(38);
linkedList.push(2);
linkedList.push(3);
linkedList.push(4);
linkedList.unshift(39);
let some = linkedList.pop();
console.log(some, 'mable\n');
linkedList.insert(5, 999);
linkedList.erase(4);
linkedList.unshift(588);
linkedList.unshift(29);
linkedList.unshift(38);
let value = linkedList.valueAtEnd(7);
linkedList.reverse();
let removedValue = linkedList.removeValue(38);
linkedList.print();
