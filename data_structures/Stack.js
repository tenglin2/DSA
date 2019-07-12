/**
 * The Stack data structure is built into arrays. It's trivial to implement it will arrays so this uses linked lists.
 */
const Node = class {
	constructor(value) {
		this.value = value;
		this.next = null;
	}
};

const Stack = class {
	constructor() {
		this.bottom = null;
		this.top = null;
		this.length = 0;
	}

	push(value) {
		let newNode = new Node(value);

		// In the case where the stack is empty...
		if (this.length === 0) {
			this.bottom = newNode;
			this.top = this.bottom;
		}

		// Normal case, just add to the top.
		this.top.next = newNode;
		this.top = newNode;

		this.length += 1;

		// Returning a reference to the stack.
		return this;
	}

	pop() {
		// If you try to pop an empty stack, error.
		if (this.length === 0) return null;

		// If there is only one element.
		if (this.length === 1) {
			let poppedNode = this.bottom;
			this.bottom = null;
			this.top = null;
			this.length -= 1; // Should be one now.

			return poppedNode.value;
		}

		// The newTop node progresses until it is the second last element. We don't want to do an iteration at the last element because we would be assigning it to last and not second last
		let newTop = this.bottom;
		for (let i = 0; i < this.length - 2; i++) {
			newTop = newTop.next;
		}

		let poppedNode = newTop.next;
		newTop.next = null;
		this.top = newTop;
		this.length -= 1;

		return poppedNode;
	}

	print() {
		// An array structure for printing purposes.
		let printArray = [];

		// Iterating through every node and adding it to the print array.
		let currentNode = this.bottom;
		for (let i = 0; i < this.length; i++) {
			printArray.push(currentNode.value);
			currentNode = currentNode.next;
		}

		// Loggin to the console.
		console.log(printArray);

		// Return a reference to the stack.
		return this;
	}

	getBottom() {
		return this.bottom.value;
	}

	gettop() {
		return this.top.value;
	}

	getSize() {
		return this.length;
	}
};

let stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);
stack.push(4);
console.log(stack.getBottom());
stack.print();
