/**
 * Queue data structure which is extremely similar to the stack data structure. The only difference is that we remove items from the front instead of the back. Again be use a linked list because using an array would be trivial since it already has the functionality built in.
 */

const Node = class {
	constructor(value) {
		this.value = value;
		this.next = null;
	}
};

const Queue = class {
	constructor() {
		this.front = null;
		this.back = null;
		this.length = 0;
	}

	enqueue(value) {
		let newNode = new Node(value);

		// In the case where the stack is empty...
		if (this.length === 0) {
			this.front = newNode;
			this.back = this.front;
		}

		// Normal case, just add to the back.
		this.back.next = newNode;
		this.back = newNode;

		this.length += 1;

		// Returning a reference to the stack.
		return this;
	}

	dequeue() {
		// If you try to pop an empty stack, error.
		if (this.length === 0) return null;

		// If there is only one element.
		if (this.length === 1) {
			let dequeuedNode = this.front;
			this.front = null;
			this.back = null;
			this.length -= 1; // Should be one now.

			return dequeuedNode.value;
		}

		// Normal case we take the front and set the next front to the next element.
		let dequeuedNode = this.front;
		this.front = dequeuedNode.next;
		this.length -= 1;

		// Clean the node of pointers
		dequeuedNode.next = null;

		// Return the dequeued node.
		return dequeuedNode;
	}

	print() {
		// An array structure for printing purposes.
		let printArray = [];

		// Iterating through every node and adding it to the print array.
		let currentNode = this.front;
		for (let i = 0; i < this.length; i++) {
			printArray.push(currentNode.value);
			currentNode = currentNode.next;
		}

		// Loggin to the console.
		console.log(printArray);

		// Return a reference to the stack.
		return this;
	}

	getFront() {
		return this.front.value;
	}

	getBack() {
		return this.back.value;
	}

	getSize() {
		return this.length;
	}
};

let queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
queue.enqueue(4);
queue.enqueue(5);
queue.dequeue();
queue.dequeue();
queue.dequeue();
console.log(queue.getBack());
queue.print();
