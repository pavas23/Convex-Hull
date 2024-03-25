function nthSmallest(list, n) {
    const index = select(list, 0, list.length - 1, n - 1);
    return list[index];
}

function select(list, left, right, n) {
    while (true) {
        if (left === right) return left;
        const pivotIndex = pivot(list, left, right);
        const newPivotIndex = partition(list, left, right, pivotIndex, n);
        if (n === newPivotIndex) return n;
        else if (n < newPivotIndex) right = newPivotIndex - 1;
        else left = newPivotIndex + 1;
    }
}

function pivot(list, left, right) {
    if (right - left < 5) return partition5(list, left, right);
    for (let i = left; i <= right; i += 5) {
        let subRight = i + 4;
        if (subRight > right) subRight = right;
        const median5 = partition5(list, i, subRight);
        [list[median5], list[left + Math.floor((i - left) / 5)]] = [list[left + Math.floor((i - left) / 5)], list[median5]];
    }
    const mid = Math.floor((right - left) / 10) + left + 1;
    return select(list, left, left + Math.floor((right - left) / 5), mid);
}

function partition(list, left, right, pivotIndex, n) {
    const pivotValue = list[pivotIndex];
    [list[pivotIndex], list[right]] = [list[right], list[pivotIndex]];
    let storeIndex = left;
    for (let i = left; i < right; i++) {
        if (list[i] < pivotValue) {
            [list[storeIndex], list[i]] = [list[i], list[storeIndex]];
            storeIndex++;
        }
    }
    let storeIndexEq = storeIndex;
    for (let i = storeIndex; i < right; i++) {
        if (list[i] === pivotValue) {
            [list[storeIndexEq], list[i]] = [list[i], list[storeIndexEq]];
            storeIndexEq++;
        }
    }
    [list[right], list[storeIndexEq]] = [list[storeIndexEq], list[right]];
    if (n < storeIndex) return storeIndex;
    if (n <= storeIndexEq) return n;
    return storeIndexEq;
}

function partition5(list, left, right) {
    let i = left + 1;
    while (i <= right) {
        let j = i;
        while (j > left && list[j - 1] > list[j]) {
            [list[j - 1], list[j]] = [list[j], list[j - 1]];
            j--;
        }
        i++;
    }
    return left + Math.floor((right - left) / 2);
}

// const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 8, 7, 6, 5, 4, 3, 2, 1, 10];
// const n = Math.ceil(list.length/2); 
// const nthSmallestElement = nthSmallest(list, n);
// console.log(nthSmallestElement);


module.exports = nthSmallest;
