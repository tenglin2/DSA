/**
 * Quick sort. It works using pivots and it has a great complexity. It's a big harder to understand though. I remember that the pivot is recommended to be the very last element. Something about a partition.
 * The idea is to find the partition, ie find the place where the pivot has everything less than be to the left and everything to the right of it be greater than.
 * 
 * Okay to think of it like this. You want to first choose a pivot, usually the end of the array. You want to find the partition index which is the index where everything to the left is less than and everything to the right is greater than. This is done by having a pointer for the partition index and traversal i. We want to find every instance of numbers that are less than the pivot and populate the left side with those numbers. We keep a count called partition index that keeps track of the exact index that we need to replace the pivot with. The actual swapping is with the traversal elements and the partition position.
 * 
 * This gives us a partition index that is in the correct position. We use recursion with splitting until we only have one element. We represent this by checking until start < end fails. Finally return the array.
 * 
 * Quick sort is best case O(nlogn) and worse case of O(n^2). The space complexity is O(logn). The reason why the worst case is O(n^2) and it happens when a pivot is terrible such that you need O(n) decompositions.
 * 
 * QuickSort vs. MergeSort. Merge sort has a better worse case performance but quicksort is considered better. This is because mergesort uses extra space, it is in place, worse case can be mitigated by using randomized quicksort, good with memory, etc. But merge sort is better for large data structures and it is easier to implement. On the average case, quicksort is better a big reason is because of minimal memory requirement.
 */
// const partition = function(arr, start, end) {
//   let pivot = arr[end];
//   let partitionIndex = start;

//   for (let i = start; i < end; i++) {
//     if (arr[i] <= pivot) {
//       [arr[i], arr[partitionIndex]] = [arr[partitionIndex], arr[i]];
//       partitionIndex += 1;
//     }
//   }

//   [arr[partitionIndex], arr[end]] = [arr[end], arr[partitionIndex]];
//   return partitionIndex;
// };

// console.log(partition([1,2,3,4,6,7,8,5], 0, 7));

const partition = function(arr, start, end) {
  let pivot = arr[end];
  let partitionIndex = start;
  for (let i = start; i < end; i++) {
    if (arr[i] <= pivot) {
      [arr[i], arr[partitionIndex]] = [arr[partitionIndex], arr[i]];
      partitionIndex += 1;
    }
  }

  [arr[partitionIndex], arr[end]] = [arr[end], arr[partitionIndex]];
  return partitionIndex;
};

const quickSort = function(arr, start = 0, end = arr.length - 1) {
  if (start < end) {
    let partitionIndex = partition(arr, start, end);

    quickSort(arr, start, partitionIndex - 1);
    quickSort(arr, partitionIndex + 1, end);
  }

  return arr;
};

console.log(quickSort([4,2,99,102,55,1,8,5,993,12,7,3]));