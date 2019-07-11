/**
 * Bubble sort works by swapping all along and bubbling the largest numbers to the top. Not very good for efficiency, but you basically need to have a pivot and shrink it each pass to avoid unnecessary iteration.
 * The time complexity is O(n^2) because of double for loop. We do have a noSwap flag that detects if there are no swaps in a pass that the array is already ordered. If the data is nearly sorted, then the time complexity is about O(n).
 * REMINDERS: Large numbers 'bubble' to the top, Set a pointer to the last element index to represent the position that will be replaced. Bubble sort uses multiple swap steps using a j and j+1 pointer that progresses up to and including the pivot index --> when j < i (or j+1 = i).
 */
const bubbleSort = function(arr) {
	// The outer loop represents the number of passes and starts at the last index. It is the position that may be swapped with each pass.
	for (let i = arr.length - 1; i > 0; i--) {
		// Used to check if pass is already sorted.
		let noSwaps = true;

		// j pointer progresses from start to finish and does the swapping.
		for (let j = 0; j < i; j++) {
			// Swap step.
			if (arr[j] > arr[j + 1]) {
				[ arr[j], arr[j + 1] ] = [ arr[j + 1], arr[j] ];
				noSwaps = false;
			}
		}

		if (noSwaps) return arr;
	}

	return arr;
};
