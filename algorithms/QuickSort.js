/**
 * Quick sort. The idea is to find the partition, ie find the place where the pivot has everything less than be to the left and everything to the right of it be greater than.
 * Okay to think of it like this. You want to first choose a pivot, usually the end of the array. You want to find the partition index which is the index where everything to the left is less than and everything to the right is greater than. This is done by having a pointer for the partition index and traversal i. We want to find every instance of numbers that are less than the pivot and populate the left side with those numbers. We keep a count called partition index that keeps track of the exact index that we need to replace the pivot with. The actual swapping is with the traversal elements and the partition position.
 * This gives us a partition index that is in the correct position. We use recursion with splitting until we only have one element. We represent this by checking until start < end fails. Finally return the array.
 * Quick sort is best case O(nlogn) and worse case of O(n^2). The space complexity is O(logn). The reason why the worst case is O(n^2) and it happens when a pivot is terrible such that you need O(n) decompositions.
 * QuickSort vs. MergeSort. Merge sort has a better worse case performance but quicksort is considered better. This is because mergesort uses extra space, it is in place, worse case can be mitigated by using randomized quicksort, good with memory, etc. But merge sort is better for large data structures and it is easier to implement. So it depends on the situation.
 * REMINDERS: Set a pivot to the end then iterate from the start to the index before the end. Continually progress the partitionIndex to find the exact position that the pivot should be in. The actual recursive step stops when the start < end condition fails.
 */
const partition = function(arr, start, end) {
	// We let the pivot be the end, but there are other ways of doing it. Setting the pivot at the end is easier to understand, but the logic works the same for other pivots.
	let pivot = arr[end];
	let partitionIndex = start;

	// We loop through every index except the last to count the number of elements that are less than the pivot. This determines the actual index that the pivot should be on, hence the partitionIndex incremention.
	for (let i = start; i < end; i++) {
		// Not necessary to do <=, < would work fine since they are the same number.
		if (arr[i] <= pivot) {
			// Swap step so that the pivot is in the right position at the end.
			[ arr[i], arr[partitionIndex] ] = [ arr[partitionIndex], arr[i] ];
			partitionIndex += 1;
		}
	}

	// Finally swapping the pivot into its correct position.
	[ arr[partitionIndex], arr[end] ] = [ arr[end], arr[partitionIndex] ];

	// We return the partitionIndex because we use it for the recursive step in quick sort.
	return partitionIndex;
};

// Notice that I gave it initial parameters for start and end because the user should not be required to input the indices for start and end. We still need start and end though because of the recursive step.
const quickSort = function(arr, start = 0, end = arr.length - 1) {
	// We do not do start <= end because when start = end, there will only be one element which is already sorted and in the correct position.
	if (start < end) {
		let partitionIndex = partition(arr, start, end);

		// Recursive step which breaks the array into two parts that DO NOT include the partitionIndex element.
		quickSort(arr, start, partitionIndex - 1);
		quickSort(arr, partitionIndex + 1, end);
	}

	return arr;
};
