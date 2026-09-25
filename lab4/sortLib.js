var SortLib = (function () {
  'use strict';
 
  // ---------- Допоміжні функції ----------
 
  // Рахує кількість undefined-елементів (у т.ч. "дір" розрідженого масиву)
  function countUndefined(arr) {
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === undefined) count++;
    }
    return count;
  }
 
  // Повертає true, якщо a має йти ПІСЛЯ b (тобто потрібен обмін) для заданого порядку
  function needSwap(a, b, order) {
    return order === 'desc' ? a < b : a > b;
  }
 
  // Повертає true, якщо a "краще" за b у сенсі заданого порядку (для пошуку мін/макс)
  function isBetter(a, b, order) {
    return order === 'desc' ? a > b : a < b;
  }
 
  function normalizeOrder(order) {
    return order === 'desc' ? 'desc' : 'asc';
  }
 
  function reportSparse(undefinedCount, totalLength, methodName) {
    if (undefinedCount > 0) {
      console.log(
        `[${methodName}] Виявлено розріджений масив: ${undefinedCount} ` +
        `undefined-елемент(-и/-ів) із ${totalLength}. ` +
        `Вони виключені з порівнянь і переміщені в кінець результату.`
      );
    }
  }
 
  function reportStats(methodName, order, comparisons, swaps, swapLabel) {
    console.log(
      `[${methodName}] порядок: ${order === 'desc' ? 'спадання' : 'зростання'} | ` +
      `порівнянь: ${comparisons} | ${swapLabel}: ${swaps}`
    );
  }
 
  // ---------- 1. Сортування обміном (Bubble Sort) ----------
  function bubbleSort(inputArr, order) {
    order = normalizeOrder(order);
    const undefinedCount = countUndefined(inputArr);
    const arr = inputArr.filter((x) => x !== undefined);
    let comparisons = 0;
    let swaps = 0;
    const n = arr.length;
 
    for (let i = 0; i < n - 1; i++) {
      let swappedInPass = false;
      for (let j = 0; j < n - i - 1; j++) {
        comparisons++;
        if (needSwap(arr[j], arr[j + 1], order)) {
          const tmp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = tmp;
          swaps++;
          swappedInPass = true;
        }
      }
      if (!swappedInPass) break; // оптимізація: масив уже відсортований
    }
 
    reportStats('bubbleSort', order, comparisons, swaps, 'обмінів');
    reportSparse(undefinedCount, inputArr.length, 'bubbleSort');
 
    return arr.concat(new Array(undefinedCount).fill(undefined));
  }
 
  // ---------- 2. Сортування вибором мінімальних елементів (Selection Sort) ----------
  function selectionSort(inputArr, order) {
    order = normalizeOrder(order);
    const undefinedCount = countUndefined(inputArr);
    const arr = inputArr.filter((x) => x !== undefined);
    let comparisons = 0;
    let swaps = 0;
    const n = arr.length;
 
    for (let i = 0; i < n - 1; i++) {
      let selectedIdx = i;
      for (let j = i + 1; j < n; j++) {
        comparisons++;
        if (isBetter(arr[j], arr[selectedIdx], order)) {
          selectedIdx = j;
        }
      }
      if (selectedIdx !== i) {
        const tmp = arr[i];
        arr[i] = arr[selectedIdx];
        arr[selectedIdx] = tmp;
        swaps++;
      }
    }
 
    reportStats('selectionSort', order, comparisons, swaps, 'обмінів');
    reportSparse(undefinedCount, inputArr.length, 'selectionSort');
 
    return arr.concat(new Array(undefinedCount).fill(undefined));
  }
 
  // ---------- 3. Сортування вставками (Insertion Sort) ----------
  function insertionSort(inputArr, order) {
    order = normalizeOrder(order);
    const undefinedCount = countUndefined(inputArr);
    const arr = inputArr.filter((x) => x !== undefined);
    let comparisons = 0;
    let moves = 0;
 
    for (let i = 1; i < arr.length; i++) {
      const current = arr[i];
      let j = i - 1;
      while (j >= 0) {
        comparisons++;
        if (needSwap(arr[j], current, order)) {
          arr[j + 1] = arr[j];
          moves++;
          j--;
        } else {
          break;
        }
      }
      arr[j + 1] = current;
    }
 
    reportStats('insertionSort', order, comparisons, moves, 'переміщень');
    reportSparse(undefinedCount, inputArr.length, 'insertionSort');
 
    return arr.concat(new Array(undefinedCount).fill(undefined));
  }
 
  // ---------- 4. Сортування Шелла (Shell Sort) ----------
  function shellSort(inputArr, order) {
    order = normalizeOrder(order);
    const undefinedCount = countUndefined(inputArr);
    const arr = inputArr.filter((x) => x !== undefined);
    let comparisons = 0;
    let moves = 0;
    const n = arr.length;
 
    let gap = Math.floor(n / 2);
    while (gap > 0) {
      for (let i = gap; i < n; i++) {
        const current = arr[i];
        let j = i;
        while (j >= gap) {
          comparisons++;
          if (needSwap(arr[j - gap], current, order)) {
            arr[j] = arr[j - gap];
            moves++;
            j -= gap;
          } else {
            break;
          }
        }
        arr[j] = current;
      }
      gap = Math.floor(gap / 2);
    }
 
    reportStats('shellSort', order, comparisons, moves, 'переміщень');
    reportSparse(undefinedCount, inputArr.length, 'shellSort');
 
    return arr.concat(new Array(undefinedCount).fill(undefined));
  }
 
  // ---------- 5. Сортування Хоара / швидке сортування (Hoare Quick Sort) ----------
  function quickSort(inputArr, order) {
    order = normalizeOrder(order);
    const undefinedCount = countUndefined(inputArr);
    const arr = inputArr.filter((x) => x !== undefined);
    let comparisons = 0;
    let swaps = 0;
 
    function swap(a, i, j) {
      const tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
      swaps++;
    }
 
    function hoarePartition(a, low, high) {
      const pivot = a[Math.floor((low + high) / 2)];
      let i = low - 1;
      let j = high + 1;
 
      while (true) {
        do {
          i++;
          comparisons++;
        } while (order === 'desc' ? a[i] > pivot : a[i] < pivot);
 
        do {
          j--;
          comparisons++;
        } while (order === 'desc' ? a[j] < pivot : a[j] > pivot);
 
        if (i >= j) return j;
        swap(a, i, j);
      }
    }
 
    function quickSortRec(a, low, high) {
      if (low < high) {
        const p = hoarePartition(a, low, high);
        quickSortRec(a, low, p);
        quickSortRec(a, p + 1, high);
      }
    }
 
    quickSortRec(arr, 0, arr.length - 1);
 
    reportStats('quickSort (Hoare)', order, comparisons, swaps, 'обмінів');
    reportSparse(undefinedCount, inputArr.length, 'quickSort (Hoare)');
 
    return arr.concat(new Array(undefinedCount).fill(undefined));
  }
 
  // ---------- Публічний інтерфейс псевдопростору імен ----------
  return {
    bubbleSort,
    selectionSort,
    insertionSort,
    shellSort,
    quickSort
  };
})();
 
// Для можливого використання в Node.js (необов'язково для лабораторної,
// але не заважає роботі в браузері)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SortLib;
}
