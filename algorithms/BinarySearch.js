/**
 * Important to keep in mind that binary search only works with sorted iterative data. The complexity for search is O(logn) which is exceptional, but only applicable if the data is sorted.
 */
const binarySearch = function(arr, target) {
	let start = 0;
	let end = arr.length - 1;

	// We use the condition start <= end including when start === end, because we need to check that case inside of the loop. This is done in the step when (arr[middle] === target). It is necessary that we check this instance.
	while (start <= end) {
		// We use a flooring function which favors the lower half when dealing with even number of elements. This is preference, Math.ceil() will favor the upper half for middle index.
		let middle = Math.floor((start + end) / 2);

		if (arr[middle] === target) {
			return middle;
		} else if (arr[middle] > target) {
			end = middle - 1;
		} else if (arr[middle] < target) {
			start = middle + 1;
		} else return null;
		// Another else case should never happen. Null just for stylistic reasons.
	}

	// If the target is not found in the array we return an index of -1, DNE.
	return -1;
};
