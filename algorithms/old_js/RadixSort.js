/**
 * Radix Sort is not a comparison sort. Instead it is only applicable for data that is purely numbers. It manipulates the number of digits and uses bucket stacks and multiple passes. 
 */
const getDigit = function(num, place) {
  return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
};

const digitCount = function(num) {
  if (num === 0) return 1;
  return Math.floor(Math.log10(Math.abs(num))) + 1;
};

const mostDigits = function(nums) {
  let maxDigits = 0;
  
  for (let i = 0; i < nums.length; i++) {
    maxDigits = Math.max(maxDigits, digitCount(nums[i]));
  }

  return maxDigits;
};

const radixSort = function(nums) {
  let maxDigitCount = mostDigits(nums);

  for (let k = 0; k < maxDigitCount; k++) {
    let digitBuckets = Array.from({length: 10}, () => []);

    for (let i = 0; i < nums.length; i++) {
      let digit = getDigit(nums[i], k);
      digitBuckets[digit].push(nums[i]);
    }

    nums = [].concat(...digitBuckets);
  }

  return nums;
};

console.log(radixSort([23,345,54367,12,2345,14]));