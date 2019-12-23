/**
 * Linear search is actually not that bad if you have an unsorted list and a small number of values. It gets progressively worse, the larger the data amount. The worse case scenario is that the searched element is the very last one which means the complexity is O(n).
 */
const linearSearch = function(arr, target) {
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] === target) {
			return i;
		}
	}
	return -1;
};
