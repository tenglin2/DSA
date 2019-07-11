/**
 * Merge sort is the first of the intermediate sorting algorithms and it is actually really practical. I believe the time complexity is O(nlogn) which is considerable faster than the elementary sorting algorithms like bubble, selection, and insertion.
 * We recursively call the mergeSort step that returns only 1 element. Then it will merge the individual elements that are already sorted. Just remember that for every left+right split, we have a corresponding merge step. Everything devolves from the left and right recursive merge sorts.
 * Merge Sort is very reliable and stable. It is usually the most optimal sorting algorithm for most cases. Though you should keep in mind that there is a space requirement if you care about memory.
 * REMINDER: Merging two sorted arrays using multiple while loops. The recursive step has a base case when only 1 element in the array. The recursive part means we break the array into continual halves and merge at the end.
 */
const merge = function(arr1, arr2) {
	let i = 0;
	let j = 0;
	// Notice that mergedArray is a space requirement...
	let mergedArray = [];

	// We are populating the merged array by finding the smallest value each time. That means we are checking the smallest value for both arrays and comparing them.
	while (i < arr1.length && j < arr2.length) {
		if (arr1[i] <= arr2[j]) {
			mergedArray.push(arr1[i]);
			i += 1;
		} else {
			mergedArray.push(arr2[j]);
			j += 1;
		}
	}

	// At some point one of the lists will be depleted but the other will not. We need to check these two and fill in the rest of the merged array. Since the arrays are already sorted, we don't need to do a comparison or change the order.
	while (i < arr1.length) {
		mergedArray.push(arr1[i]);
		i += 1;
	}
	while (j < arr2.length) {
		mergedArray.push(arr2[j]);
		j += 1;
	}

	return mergedArray;
};

// Recursive Main Step
const mergeSort = function(arr) {
	// When we reach only one element, we know the array is sorted.
	if (arr.length <= 1) return arr;

	// We use a Math.ceil() function instead of a floor because we intend to use am Array.slice method which is inclusive at the start but exclusive at the end index.
	let middle = Math.ceil((arr.length - 1) / 2);

	let left = arr.slice(0, middle);
	let right = arr.slice(middle, arr.length);

	left = mergeSort(left);
	right = mergeSort(right);

	return merge(left, right);
};
