/**
 * Insertion sort basically works by continually building a sorted portion until we go through the whole array. Basically making two subsections - one sorted and one unsorted. 
 * The i index iterates from index 1 until the end. For each pass we overwrite the previous one if the previous value is greater than the current value. In essence, all that we are doing is moving the current value into place. We are inserting it into sorted order.
 * The left side is sorted and the right side is the unsorted part. This makes it optimal as an algorithm for live input because you don't have to mess up the whole order, only changing the end.
 * REMINDERS: Start with index 1 because only 1 element means already sorted. Go through each element and insert into the sorted list by working backwords. Remember the indices can be tricky.
 */
const insertionSort = function(arr) {
	// Here we start at index 1 and not 0 because we consider a list of 1 element ot be already sorted so it is pointless to check that case.
	for (let i = 1; i < arr.length; i++) {
		// Take the current value because everything will shift to the right.
		let currentValue = arr[i];
		let j = i - 1;

		// This step is basically progressing backwards through the sorted region and shifting everything to the right.
		while (j > -1 && arr[j] > currentValue) {
			// This is step is shifting all values to the right.
			arr[j + 1] = arr[j];
			j -= 1;
		}

		// Notice it is j + 1 and not j because the end of the while loop decremented. We are basically inserting the current value into the sorted region in the correct position.
		arr[j + 1] = currentValue;
	}

	return arr;
};
