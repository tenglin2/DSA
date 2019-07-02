/**
 * Important to keep in mind that binary search only works with sorted iterative data. There are definitely some complications with flooring and rounding.
 * From memory it is O(logn) because you are splitting the array in approximately by half with each step.
 */

function binarySearch(array, val) {
  let min = 0;
  let max = array.length - 1;

  // We use an equality operator because we don't want to exclude the case where it's only one element left.
  while (min <= max) {
    // Finding the middle index and using a 
    let middle = Math.floor((min + max) / 2);
    let currentElement = array[middle];

    if (array[middle] < val) {
      min = middle + 1;
    } else if (array[middle] > val) {
      max = middle - 1;
    } else return middle;
  }

  return -1;
}


// Redone - Note that you have to floor the middle index because javascript doesn't automatically do this. It is not strong typed for ints and doubles.
const binarySearch = function(arr, target) {
  let start = 0;
  let end = arr.length - 1;

  while (start <= end) {
    let middle = Math.floor((start + end) / 2);

    if(arr[middle] === target) {
      return middle;
    } else if (arr[middle] > target) {
      end = middle - 1;
    } else if (arr[middle] < target) {
      start = middle + 1;
    }
  }

  return -1;
};