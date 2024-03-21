class Point {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  }
  
  function kthSmallestElementSlope(arr, low, high, k) {
    k = Math.ceil(k);
    if (k > 0 && k <= high - low + 1) {
      let n = high - low + 1;
      let i,
        median = [];
  
      for (i = 0; i < Math.floor(n / 5); i++) {
        median[i] = getMedian(arr.slice(5 * i + low, 5 * i + low + 4), 5);
      }
  
      if (n % 5 !== 0) {
        median[i] = getMedian(
          arr.slice(5 * i + low, 5 * i + low + (n % 5)),
          n % 5
        );
        i++;
      }
  
      let medOfMed =
        i === 1
          ? median[i - 1]
          : kthSmallestElementSlope(median, 0, i - 1, Math.floor(i / 2));
  
      let partition = partitionPractise(arr, low, high, medOfMed);
  
      if (partition - low === k - 1) {
        return arr[partition];
      }
      if (partition - low > k - 1) {
        return kthSmallestElementSlope(arr, low, partition - 1, k);
      }
  
      return kthSmallestElementSlope(
        arr,
        partition + 1,
        high,
        k - (partition + 1) + low
      );
    }
  
    return Number.MIN_VALUE;
  }
  
  function getMedian(arr, n) {
    arr.sort((a, b) => a - b);
    return arr[Math.floor(n / 2)];
  }
  
  function swap(arr, i, index) {
    if (arr[i] === arr[index]) {
      return;
    }
    let temp = arr[i];
    arr[i] = arr[index];
    arr[index] = temp;
  }
  
  function partitionPractise(arr, low, high, pivot) {
    for (let i = low; i <= high; i++) {
      if (arr[i] === pivot) {
        swap(arr, i, high);
        break;
      }
    }
    let index = low - 1;
    for (let i = low; i < high; i++) {
      if (arr[i] < pivot) {
        index++;
        swap(arr, i, index);
      }
    }
    index++;
    swap(arr, index, high);
    return index;
  }
  
  module.exports = kthSmallestElementSlope;