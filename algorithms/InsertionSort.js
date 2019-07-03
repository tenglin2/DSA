/**
 * Insertion sort basically works by continually building a sorted portion until we go through the whole array.
 * Okay so it's a little bit complicated to thing about it, but it's basically making two subsections - one sorted and one unsorted. 
 * The i index iterates from index 1 until the end. For each pass we overwrite the previous one if the previous value is greater than the current value. In essence, all that we are doing is moving the current value into place. We are inserting it into sorted order.
 * The left side is sorted and the right side is the unsorted part. This makes it optimal as an algorithm for live input because you don't have to mess up the whole order, only changing the end.
 */
const insertionSort = function(arr) {
  for (let i = 1; i < arr.length; i++) {
    let currentValue = arr[i];
    let j = i - 1;
    while (j > -1 && arr[j] > currentValue) {
      arr[j+1] = arr[j];
      j -= 1;
    }

    arr[j+1] = currentValue;
  }

  return arr;
};

console.log(insertionSort([14,22,3,56,2,16]));