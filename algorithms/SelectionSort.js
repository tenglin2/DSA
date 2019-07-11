/**
 * Selection Sort focuses on having the minimum values in the front instead of maximum values in the back in Bubble Sort.
 * Keep in mind is that we don't do a swap operation until we complete a full pass. This is unlike bubble sort where we swap at every instance of true conditionals.
 * Compare with the minIndex and not i. Remember it can overwrite the current smallest.
 * The time complexity is O(n^2) and it is probably the worst of the elementary sorting algorithms. It has no special use cases like almost sorted Bubble Sort or live sorting Insertion Sort. Nevertheless, it is probably the easiest to understand.
 * REMINDERS: Finding smallest number with each pass and swapping only once after each pass. Do not handle the last index because it is already sorted.
 */
const selectionSort = function(arr) {
	// Progress until second last element, not last element because by end, last element will already be in correct position.
	for (let i = 0; i < arr.length - 1; i++) {
		// minIndex is taken for the eventual swap with each pass.
		let minIndex = i;

		// Loop through the rest of the array and find the minimum value's index.
		for (let j = i + 1; j < arr.length; j++) {
			if (arr[j] < arr[minIndex]) {
				minIndex = j;
			}
		}

		// Swap step.
		if (minIndex !== i) {
			[ arr[i], arr[minIndex] ] = [ arr[minIndex], arr[i] ];
		}
	}

	return arr;
};
