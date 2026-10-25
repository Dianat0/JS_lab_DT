
var SortLib = (function () {
  'use strict';

  // Підрахунок undefined-елементів
  function countUndefined(arr) {
    let count = 0;

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === undefined) {
        count++;
      }
    }

    return count;
  }

  // Перевірка, чи потрібно поміняти елементи місцями
  function needSwap(a, b, order) {
    return order === 'desc' ? a < b : a > b;
  }

  // Перевірка, чи є елемент кращим для вибору
  function isBetter(a, b, order) {
    return order === 'desc' ? a > b : a < b;
  }

  // Визначення порядку сортування
  function normalizeOrder(order) {
    return order === 'desc' ? 'desc' : 'asc';
  }

  // Повідомлення про undefined-елементи
  function reportSparse(undefinedCount, totalLength, methodName) {
    if (undefinedCount > 0) {
      console.log(
        '[' + methodName + '] Виявлено undefined-елементів: ' +
        undefinedCount + ' із ' + totalLength +
        '. Вони переміщені в кінець результату.'
      );
    }
  }

  // Виведення статистики
  function reportStats(methodName, order, comparisons, swaps, swapLabel) {
    let orderName;

    if (order === 'desc') {
      orderName = 'спадання';
    } else {
      orderName = 'зростання';
    }

    console.log(
      '[' + methodName + '] Порядок: ' + orderName +
      ' | Порівнянь: ' + comparisons +
      ' | ' + swapLabel + ': ' + swaps
    );
  }

  // 1. Сортування обміном (Bubble Sort)
  function bubbleSort(inputArr, order) {
    order = normalizeOrder(order);

    const undefinedCount = countUndefined(inputArr);
    const arr = inputArr.filter(function (x) {
      return x !== undefined;
    });

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

      if (!swappedInPass) {
        break;
      }
    }

    reportStats('bubbleSort', order, comparisons, swaps, 'Обмінів');
    reportSparse(undefinedCount, inputArr.length, 'bubbleSort');

    return arr.concat(new Array(undefinedCount).fill(undefined));
  }

  // 2. Сортування вибором (Selection Sort)
  function selectionSort(inputArr, order) {
    order = normalizeOrder(order);

    const undefinedCount = countUndefined(inputArr);
    const arr = inputArr.filter(function (x) {
      return x !== undefined;
    });

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

    reportStats('selectionSort', order, comparisons, swaps, 'Обмінів');
    reportSparse(undefinedCount, inputArr.length, 'selectionSort');

    return arr.concat(new Array(undefinedCount).fill(undefined));
  }

  // 3. Сортування вставками (Insertion Sort)
  function insertionSort(inputArr, order) {
    order = normalizeOrder(order);

    const undefinedCount = countUndefined(inputArr);
    const arr = inputArr.filter(function (x) {
      return x !== undefined;
    });

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

    reportStats('insertionSort', order, comparisons, moves, 'Переміщень');
    reportSparse(undefinedCount, inputArr.length, 'insertionSort');

    return arr.concat(new Array(undefinedCount).fill(undefined));
  }

  // 4. Сортування Шелла (Shell Sort)
  function shellSort(inputArr, order) {
    order = normalizeOrder(order);

    const undefinedCount = countUndefined(inputArr);
    const arr = inputArr.filter(function (x) {
      return x !== undefined;
    });

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

    reportStats('shellSort', order, comparisons, moves, 'Переміщень');
    reportSparse(undefinedCount, inputArr.length, 'shellSort');

    return arr.concat(new Array(undefinedCount).fill(undefined));
  }

  // 5. Швидке сортування Хоара (Quick Sort)
  function quickSort(inputArr, order) {
    order = normalizeOrder(order);

    const undefinedCount = countUndefined(inputArr);
    const arr = inputArr.filter(function (x) {
      return x !== undefined;
    });

    let comparisons = 0;
    let swaps = 0;

    // Обмін двох елементів
    function swap(a, i, j) {
      const tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
      swaps++;
    }

    // Розбиття масиву за опорним елементом
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

        if (i >= j) {
          return j;
        }

        swap(a, i, j);
      }
    }

    // Рекурсивне сортування частин масиву
    function quickSortRec(a, low, high) {
      if (low < high) {
        const p = hoarePartition(a, low, high);

        quickSortRec(a, low, p);
        quickSortRec(a, p + 1, high);
      }
    }

    quickSortRec(arr, 0, arr.length - 1);

    reportStats('quickSort (Hoare)', order, comparisons, swaps, 'Обмінів');
    reportSparse(undefinedCount, inputArr.length, 'quickSort (Hoare)');

    return arr.concat(new Array(undefinedCount).fill(undefined));
  }

  // Публічний інтерфейс бібліотеки
  return {
    bubbleSort: bubbleSort,
    selectionSort: selectionSort,
    insertionSort: insertionSort,
    shellSort: shellSort,
    quickSort: quickSort
  };
})();

// Експорт для Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SortLib;
}

// ========================================
// АВТОМАТИЧНЕ ТЕСТУВАННЯ
// ========================================

console.log('========================================');
console.log('   ТЕСТУВАННЯ БІБЛІОТЕКИ SortLib');
console.log('========================================');

// Початковий тестовий масив
const testArray = [45, 12, 78, 3, 56, 12, undefined, 34];

console.log('\nПочатковий масив:');
console.log(testArray);

// Список алгоритмів
const methods = [
  ['Bubble Sort', SortLib.bubbleSort],
  ['Selection Sort', SortLib.selectionSort],
  ['Insertion Sort', SortLib.insertionSort],
  ['Shell Sort', SortLib.shellSort],
  ['Quick Sort (Hoare)', SortLib.quickSort]
];

// Перевірка обох порядків сортування
for (const order of ['asc', 'desc']) {
  console.log('\n========================================');

  if (order === 'asc') {
    console.log('СОРТУВАННЯ ЗА ЗРОСТАННЯМ');
  } else {
    console.log('СОРТУВАННЯ ЗА СПАДАННЯМ');
  }

  console.log('========================================');

  for (const method of methods) {
    const name = method[0];
    const sortFunction = method[1];

    console.log('\n--- ' + name + ' ---');

    // Передаємо копію масиву
    const result = sortFunction(testArray.slice(), order);

    console.log('Результат сортування:');
    console.log(result);
  }
}

console.log('\n========================================');
console.log('       ТЕСТУВАННЯ ЗАВЕРШЕНО');
console.log('========================================');
