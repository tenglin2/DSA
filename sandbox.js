// Implement a quick sort algorithm on a given array.
const partition = function(arr, start, end) {
	// We establish the pivot as the end and keep track of the partitionIndex which is start in the beginning.
	const pivot = arr[end];
	const partitionIndex = start;

	// Now we need to iterate through every element except for the last to find out the correct placement.

	for (let i = start; i < end - 1; i++) {
		if (pivot > arr[i]) {
			// Then we know that this index value is definitely to left of it, so move the partition index by 1.
			// Slightly wrong, you have to swap each time.
			[ arr[i], arr[partitionIndex] ] = [ arr[partitionIndex], arr[i] ];
			partitionIndex++;
		}
	}

	// After looping the pivot should be swapped with the placement in the partition index.
	[ arr[end], arr[partitionIndex] ] = [ arr[partitionIndex], arr[end] ];

	// Return the partition index so that quick sort can continue the recursion.
	return partitionIndex;
};

const quickSort = function(arr, start = 0, end = arr.length - 1) {
	// The idea behind quicksort is to find the partition point and sort the left and right sides.
	// This algorithm is in place so you should not be making extra memory.
	// This will only occur if there are enough elements to partition with, ie 3. So the indexes must check out.
	if (start < end) {
		const partitionIndex = partition(arr, start, end);
		const left = quickSort(arr, start, partitionIndex - 1);
		const right = quickSort(arr, partitionIndex + 1, end);
		return arr;
	}
};

const merge = function(arr1, arr2) {
	let i = 0;
	let j = 0;

	let mergedArray = new Array(arr1.length + arr2.length);

	while (i < arr1.length && j < arr2.length) {
		// Populate the mergedArray by comparing the values.
		if (arr1[i] <= arr2[j]) {
			mergedArray.push(arr1[i]);
			i++;
		} else {
			mergedArray.push(arr2[j]);
			j++;
		}
	}

	while (i < arr1.length) {
		mergedArray.push(arr1[i]);
		i++;
	}

	while (j < arr2.length) {
		mergedArray.push(arr2[j]);
		j++;
	}

	return mergedArray;
};

// Implement a merge sort
const mergeSort = function(arr) {
	// So the idea behind a merge sort is to split up the arr until there is only one element and hence sorted. Then build it back together in the merge step. The base case is when the arr.length <= 1 because that means there is only one element.

	if (arr.length <= 1) return arr;

	let middle = Math.ceil((arr.length - 1) / 2);

	const left = mergeSort(arr.slice(0, middle));
	const right = mergeSort(arr.slice(middle, arr.length));

	return merge(left, right);
};

// Implement a binary search on a sorted array.
const binarySearch = function(arr, target) {
	// Remember that it has to be sorted or else it doesn't work.
	// Know that the logic behind binary is just splitting it in the middle until the start and end are equal or we find it.

	let start = 0;
	let end = arr.length - 1;

	// Remember we have to include the equal case incase it's the very last one.
	while (start <= end) {
		// Mistake here, should be start + end, not end - start.
		let middle = Math.floor((start + end) / 2);

		if (arr[middle] === target) return middle;
		else if (arr[middle] < target) {
			// We know that the real value is in the right half so move the start index.
			start = middle + 1;
		} else if (arr[middle] > target) {
			// The target is in the left pile so move the end pointer.
			end = middle - 1;
		} else return null;
	}

	// If the value is never found, return -1 for failed index.
	return -1;
};

// The other ones are not worth remembering.

// Create a linked list class with values and pointers to next value, hence singly linked list.
const Node = class {
	constructor(value) {
		this.value = value;
		this.next = null;
	}
};

// Remember that this is like a function expression not just a declaration. The declaration is the same thing though, we just save it to a variable in the expression format because it adheres more to functional programming and working in blocks.

const SinglyLinkedList = class {
	constructor() {
		// When we first initialize, we shouldn't actually pass in any parameters.
		this.head = null;
		this.tail = null;
		this.length = 0;
	}

	// Now establishing the methods that actually affect it. Remember that inside of a class you make methods which don't need the declaration. They are part of the prototype of the class(technically a function).
	push(value) {
		let newNode = new Node(value);

		if (this.head === null) {
			this.head = newNode;
			this.tail = this.head;
			this.length += 1;
		} else {
			this.tail.next = newNode;
			this.tail = newNode;
			this.length += 1;
		}

		// When I push a value, I don't expect a return of anything, but I guess for clarity sake you can return the class instance.
		return this;
	}

	pop() {
		// Removing the last value. That means we need to find the current node right before the tail since we don't have a prev pointer.
		let currentNode = this.head;

		// Instead you should have done a iteration with a for loop since we have length. Stop at -2 though since we want to stop at the second last.

		while (currentNode.next !== this.tail) {
			currentNode = currentNode.next;
		}

		currentNode.next = null;
		this.tail = currentNode;
		this.length -= 1;

		return this;
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

	reverse() {
		let currentNode = this.head;

		[ this.head, this.tail ] = [ this.tail, this.head ];

		let next;
		let prev = null;

		for (let i = 0; i < this.length; i++) {
			next = currentNode.next;
			currentNode.next = prev;
			prev = currentNode;
			currentNode = next;
		}
		// Not sure how this works for within a linked list.
	}
};

// Remember that a stack can be implemented using an array or a linked list. They both work the same way. The advantage of LL of array is that insertion is better but accessing is a bit worse.
