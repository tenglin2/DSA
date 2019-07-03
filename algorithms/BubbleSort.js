/**
 * Bubble sort works by swapping all along and bubbling the largest numbers to the top. Not very good for efficiency, but you basically need to have a pivot and shrink it each pass to avoid unnecessary iteration.
 * The big O is O(n^2) because of double for loop. We do have a noSwap flag that detects if there are no swaps in a pass that the array is already ordered. If the data is nearly sorted, then the time complexity is about O(n).
 */
const bubbleSort = function(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let noSwaps = true;
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        console.log('swap', arr[j], arr[j+1], arr);
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
        noSwaps = false;
      }
    }


    console.log('one pass completed');
    
    if (noSwaps) {
      console.log('no swaps - BREAK');
      break;
    }
  }

  console.log('final', arr);
  return arr;
};

bubbleSort([22,33,14,7,13,5]);
console.log('second');
bubbleSort([1,2,3]);