/**
 * Merge sort is the first of the intermediate sorting algorithms and it is actually really practical. I believe the time complexity is O(nlogn) which is considerable faster than the elementary sorting algorithms like bubble, selection, and insertion.
 * 
 * Okay so there are two main parts, the recursive split and the merge step. The merge step is easier to understand because we are just using a couple of while loops and building a sorted array. The recursive step is somewhat confusing. We recursively call the mergeSort step that returns only 1 element. Then it will merge the individual elements that are already sorted. Just remember that for every left+right split, we have a corresponding merge step. Everything devolves from the left and right recursive merge sorts.
 */
const merge = function(arr1, arr2) {
  let i = 0;
  let j = 0;
  let mergedArray = [];

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

// console.log(merge([1,3,5], [2,4,6]));

const mergeSort = function(arr) {
  if (arr.length <= 1) return arr;

  let middle = Math.ceil((arr.length - 1) / 2);

  let left = arr.slice(0, middle);
  let right = arr.slice(middle, arr.length);

  left = mergeSort(left);
  right = mergeSort(right);

  return merge(left, right);
};

console.log(mergeSort([1,3,2,7,4,8]));

