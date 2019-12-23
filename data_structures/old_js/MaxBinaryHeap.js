/**
 * Max Binary Heap have a relationship between parent and child such that every parent is larger than its child. We store the values using an array because there is a mathematical relationship between the parents and children.
 * Remember that we implement a binary heap using an array storaage because the relationship between parent and child is solved using math with indices.
 * The logic for a min binary heap is the same. We just need to change the conditional statements and some variable names.
 * The time complexity for insertion and removal is O(logn) with search as O(n). This is actually pretty good. The search is bad because there is no gauranteed distinct relationship to find the value.
 */
const MaxBinaryHeap = class {
	constructor() {
		this.values = [];
	}

	// The idea behind this method is to start off by setting it at the end, then calling a helper method called bubbleUp which moves the value to the right position in storage.
	insert(value) {
		this.values.push(value);
		this.bubbleUp();
	}

	bubbleUp() {
		// The index of the last element in the array.
		let index = this.values.length - 1;

		// Storing the last element value.
		let value = this.values[index];

		// While the value that you want to bubble up is not in the root location.
		while (index > 0) {
			let parentIndex = Math.floor((index - 1) / 2);
			let parent = this.values[parentIndex];

			// Break when the given value is less than the parent. Meaning the node is now in the correct position.
			if (value <= parent) break;

			// New assignment. Swapping the values between the parent and child, then updating the given index.
			this.values[parentIndex] = value;
			this.values[index] = parent;
			index = parentIndex;
		}
	}

	extractMax() {
		let max = this.values[0];

		// Gets the last value and removes it from storage.
		let end = this.values.pop();

		// We want to make sure that the array has some elements inside of it.
		if (this.values.length > 0) {
			// Setting the deleted value to the top of the heap, but now we need a helper function called sink down that puts it into the correct position.
			this.values[0] = end;
			this.sinkDown();
		} else return null; // No elements in the array so return null;

		return max;
	}

	sinkDown() {
		let index = 0;
		let length = this.values.length;
		let value = this.values[0];

		while (true) {
			// These are the formulas to the find the index of a given parent index.
			let leftChildIndex = 2 * index + 1;
			let rightChildIndex = 2 * index + 2;

			let leftChild;
			let rightChild;
			let swap = null;

			// Meaning the index is a valid part of the array...
			if (leftChildIndex < length) {
				leftChild = this.values[leftChildIndex];
				if (leftChild > value) {
					swap = leftChildIndex;
				}
			}
			if (rightChildIndex < length) {
				rightChild = this.values[rightChildIndex];

				// Conditional to swap the given value with the LARGEST child, which is why we do this conditional check.
				if ((swap === null && rightChild > value) || (swap !== null && rightChild > leftChild)) {
					swap = rightChildIndex;
				}
			}

			// Break if the children are not larger than the current value, thus no swap is necesary.
			if (swap === null) break;

			// New assignments after find the correct swap index.
			this.values[index] = this.values[swap];
			this.values[swap] = value;

			// Assign a new index value for the new while loop.
			index = swap;
		}
	}

	print() {
		console.log(this.values);

		// Returns a reference to the class.
		return this;
	}
};

console.log('hello');
let heap = new MaxBinaryHeap();
heap.insert(1);
heap.insert(5);
heap.insert(6);
heap.insert(7);
heap.insert(3);
heap.insert(12);
heap.insert(19);
heap.insert(27);
heap.extractMax();
heap.extractMax();
heap.print();
