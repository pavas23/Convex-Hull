class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

function scam(arr,low,high,k){
  arr.sort((a,b)=>a.x-b.x);
  k = Math.ceil(k);
  return arr[k-1+low];
}

function kthSmallestElement(arr, low, high, k) {
  return scam(arr,low,high,k);
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
        ? median[i - 1].x
        : kthSmallestElement(median, 0, i - 1, Math.floor(i / 2)).x;

    let partition = partitionPractise(arr, low, high, medOfMed);

    if (partition - low === k - 1) {
      return arr[partition];
    }
    if (partition - low > k - 1) {
      return kthSmallestElement(arr, low, partition - 1, k);
    }

    return kthSmallestElement(
      arr,
      partition + 1,
      high,
      k - (partition + 1) + low
    );
  }

  return new Point(-1, -1);
}

function getMedian(arr, n) {
  arr.sort((a, b) => a.x - b.x);
  return arr[Math.floor(n / 2)];
}

function swap(arr, i, index) {
  if (arr[i].x === arr[index].x) {
    return;
  }
  let temp = arr[i];
  arr[i] = arr[index];
  arr[index] = temp;
}

function partitionPractise(arr, low, high, pivot) {
  for (let i = low; i <= high; i++) {
    if (arr[i].x === pivot) {
      swap(arr, i, high);
      break;
    }
  }
  let index = low - 1;
  for (let i = low; i < high; i++) {
    if (arr[i].x < pivot) {
      index++;
      swap(arr, i, index);
    }
  }
  index++;
  swap(arr, index, high);
  return index;
}

module.exports = kthSmallestElement;