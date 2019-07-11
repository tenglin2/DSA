/**
 * Max Binary Heap have a relationship between parent and child such that every parent is larger than its child. We store the values using an array because there is a mathematical relationship between the parents and children.
 */
const MaxBinaryHeap = class {
	constructor() {
		this.values = [];
	}

	insert(value) {
		this.values.push(value);
		this.bubbleUp();
	}

	bubbleUp() {
		let idx = this.values.length - 1;
		const value = this.values[idx];

		while (true) {
			let parentIdx = Math.floor((idx - 1) / 2);
			let parent = this.values[parentIdx];

			if (value <= parent) break;

			this.values[parentIdx] = element;
			this.values[idx] = parent;
			idx = parentIdx;
		}
	}

	extractMax() {
		const max = this.values[0];
		const end = this.values.pop();

		if (this.values.length > 0) {
			this.values[0] = end;
			this.sinkDown();
		}

		return max;
	}

	sinkDown() {
		let idx = 0;
		const length = this.values.length;
		const element = this.values[0];

		while (true) {
			let leftChildIdx = 2 * idx + 1;
			let rightChildIdx = 2 * idx + 2;
			let leftChild, rightChild;
			let swap = null;

			if (leftChildIdx < length) {
				leftChild = this.values[leftChildIdx];
				if (leftChild > element) {
					swap = leftChildIdx;
				}
			}
			if (rightChildIdx < length) {
				rightChild = this.values[rightChildIdx];
				if ((rightChild > element && swap === null) || (swap !== null && rightChild > leftChild)) {
					swap = rightChildIdx;
				}
			}

			if (swap === null) break;
			this.values[idx] = this.values[swap];
			this.values[swap] = element;
		}
	}
};
