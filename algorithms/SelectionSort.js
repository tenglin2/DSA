/**
 * Selection sort works somewhat similar to bubble sort except we focus on having the minimum values in the front instead of maximum values in the back. Likewise, we have a pivot that continues to progress through each pass so that we don't have to do a complete O(n^2) time complexity.
 * The trick to remembering this is think about the pivot and how it will progress from index 0 to index arr.length - 2 because the last swap will be not the last element but the second last element. The condition will be < arr.length - 1 which is the same meaning.
 * Another thing to keep in mind is that we don't do a swap operation until we complete a full pass. This is unlike bubble sort where we swap at every instance of true conditionals.
 * Compare with the minIndex and not i. Remember it can overwrite the current smallest.
 */
const selectionSort = function(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    console.log('before swap', arr);
    
    // One pass has completed...
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
    
    console.log('after swap', arr);
  }

  return arr;
};

console.log(selectionSort([93,8,12, 26, 100, 99]));