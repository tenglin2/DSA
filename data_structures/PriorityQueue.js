/**
 * The concepts behind priority queues extends from binary heaps and they are often confused with each other.
 * Notice that this priority queue is modeled using a min heap which means a priority with a smaller number will have a greater importance. That means a priority of 1 will be dequeued before priority 99.
 */
const Node = class {
	constructor(value, priority) {
		this.value = value;
		this.priority = priority;
	}
};

const PriorityQueue = class {
	constructor() {
		this.values = [];
	}

	enqueue(value, priority) {
		let newNode = new Node(value, priority);
		this.values.push(newNode);
		this.bubbleUp();
	}

	bubbleUp() {
		let index = this.values.length - 1;

		// value is the last element that we just added as a node.
		let value = this.values[index];

		// Continue to iterate until break or root element of heap.
		while (index > 0) {
			let parentIndex = Math.floor((index - 1) / 2);
			let parent = this.values[parentIndex];

			// We implement this priority queue by prioritizing lower numbers.
			if (value.priority >= parent.priority) break;

			this.values[parentIndex] = value;
			this.values[index] = parent;
			index = parentIndex;
		}
	}

	// We are removing the greatest importantce/priority element. In this case it is the lowest number priority.
	dequeue() {
		// The root element will have the min priority
		let min = this.values[0];

		// Removing the end node from the array and setting to a variable.
		let end = this.values.pop();

		if (this.values.length > 0) {
			this.values[0] = end;

			// Sink down is to correct the position of the new root node.
			this.sinkDown();
		}

		return min;
	}

	sinkDown() {
		let index = 0;
		let length = this.values.length;
		let value = this.values[0];

		while (true) {
			// Formulas for children.
			let leftChildIndex = 2 * index + 1;
			let rightChildIndex = 2 * index + 2;

			let leftChild;
			let rightChild;

			// Used to find the index of the child to swap the current node with.
			let swap = null;

			// If the index of the child is valid and inside the values array.
			if (leftChildIndex < length) {
				leftChild = this.values[leftChildIndex];

				// If the child has a smaller priority number then we need to swap.
				if (leftChild.priority < value.priority) {
					swap = leftChildIndex;
				}
			}
			if (rightChildIndex < length) {
				rightChild = this.values[rightChildIndex];

				if (
					(swap === null && rightChild.priority < value.priority) ||
					(swap !== null && rightChild.priority < leftChild.priority)
				) {
					swap = rightChildIndex;
				}
			}

			// Break case if children fail.
			if (swap === null) break;
			this.values[index] = this.values[swap];
			this.values[swap] = value;

			// Updating the new index.
			index = swap;
		}
	}
};

let ER = new PriorityQueue();

ER.enqueue('cold', 5);
ER.enqueue('gun wound', 1);
ER.enqueue('fever', 4);
ER.enqueue('broken arm', 2);
ER.enqueue('wound', 3);

console.log(ER.values);
console.log(ER.dequeue());
console.log(ER.dequeue());
console.log(ER.dequeue());
console.log(ER.dequeue());
console.log(ER.dequeue());
