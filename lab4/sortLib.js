var SortLib = (function () {
  'use strict';

  // Підрахунок undefined
  function countUndefined(arr) {
    let count = 0;

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === undefined) {
        count++;
      }
    }

    return count;
  }

  // Перевірка необхідності обміну
  function needSwap(a, b, order) {
    return order === 'desc' ? a < b : a > b;
  }

  // Перевірка кращого елемента
  function isBetter(a, b, order) {
    return order === 'desc' ? a > b : a < b;
  }

  // Визначення напрямку сортування
  function normalizeOrder(order) {
    return order === 'desc' ? 'desc' : 'asc';
  }

  // Повідомлення про undefined
  function reportSparse(count, length, name) {
    if (count > 0) {
      console.log(
        name + ': знайдено undefined: ' +
        count + ' із ' + length +
        '. Елементи переміщено в кінець.'
      );
    }
  }

  // Виведення статистики
  function reportStats(name, order, comparisons, operations, label) {
    const orderName = order === 'desc' ? 'спадання' : 'зростання';

    console.log(
      name + ' | Порядок: ' + orderName +
      ' | Порівнянь: ' + comparisons +
      ' | ' + label + ': ' + operations
    );
  }

  // Підготовка масиву
  function prepareArray(inputArr) {
    if (!Array.isArray(inputArr)) {
      throw new TypeError('Потрібно передати масив.');
    }

    const undefinedCount = countUndefined(inputArr);

    const arr = inputArr.filter(function (x) {
      return x !== undefined;
    });

    return {
      arr: arr,
      undefinedCount: undefinedCount
    };
  }

  // Додавання undefined у кінець
  function finishSort(arr, undefinedCount) {
    return arr.concat(new Array(undefinedCount).fill(undefined));
  }

  // Сортування обміном
  function bubbleSort(inputArr, order) {
    order = normalizeOrder(order);

    const prepared = prepareArray(inputArr);
    const arr = prepared.arr;
    const undefinedCount = prepared.undefinedCount;

    let comparisons = 0;
    let swaps = 0;

    for (let i = 0; i < arr.length - 1; i++) {
      let swapped = false;

      for (let j = 0; j < arr.length - i - 1; j++) {
        comparisons++;

        if (needSwap(arr[j], arr[j + 1], order)) {
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;

          swaps++;
          swapped = true;
        }
      }

      if (!swapped) {
        break;
      }
    }

    reportStats('Bubble Sort', order, comparisons, swaps, 'Обмінів');
    reportSparse(undefinedCount, inputArr.length, 'Bubble Sort');

    return finishSort(arr, undefinedCount);
  }

  // Сортування вибором
  function selectionSort(inputArr, order) {
    order = normalizeOrder(order);

    const prepared = prepareArray(inputArr);
    const arr = prepared.arr;
    const undefinedCount = prepared.undefinedCount;

    let comparisons = 0;
    let swaps = 0;

    for (let i = 0; i < arr.length - 1; i++) {
      let selectedIdx = i;

      for (let j = i + 1; j < arr.length; j++) {
        comparisons++;

        if (isBetter(arr[j], arr[selectedIdx], order)) {
          selectedIdx = j;
        }
      }

      if (selectedIdx !== i) {
        const temp = arr[i];
        arr[i] = arr[selectedIdx];
        arr[selectedIdx] = temp;

        swaps++;
      }
    }

    reportStats('Selection Sort', order, comparisons, swaps, 'Обмінів');
    reportSparse(undefinedCount, inputArr.length, 'Selection Sort');

    return finishSort(arr, undefinedCount);
  }

  // Сортування вставками
  function insertionSort(inputArr, order) {
    order = normalizeOrder(order);

    const prepared = prepareArray(inputArr);
    const arr = prepared.arr;
    const undefinedCount = prepared.undefinedCount;

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

    reportStats('Insertion Sort', order, comparisons, moves, 'Переміщень');
    reportSparse(undefinedCount, inputArr.length, 'Insertion Sort');

    return finishSort(arr, undefinedCount);
  }

  // Сортування Шелла
  function shellSort(inputArr, order) {
    order = normalizeOrder(order);

    const prepared = prepareArray(inputArr);
    const arr = prepared.arr;
    const undefinedCount = prepared.undefinedCount;

    let comparisons = 0;
    let moves = 0;
    let gap = Math.floor(arr.length / 2);

    while (gap > 0) {
      for (let i = gap; i < arr.length; i++) {
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

    reportStats('Shell Sort', order, comparisons, moves, 'Переміщень');
    reportSparse(undefinedCount, inputArr.length, 'Shell Sort');

    return finishSort(arr, undefinedCount);
  }

  // Швидке сортування Хоара
  function quickSort(inputArr, order) {
    order = normalizeOrder(order);

    const prepared = prepareArray(inputArr);
    const arr = prepared.arr;
    const undefinedCount = prepared.undefinedCount;

    let comparisons = 0;
    let swaps = 0;

    function swap(a, i, j) {
      const temp = a[i];
      a[i] = a[j];
      a[j] = temp;
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

        if (i >= j) {
          return j;
        }

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

    reportStats('Quick Sort (Hoare)', order, comparisons, swaps, 'Обмінів');
    reportSparse(undefinedCount, inputArr.length, 'Quick Sort');

    return finishSort(arr, undefinedCount);
  }

  return {
    bubbleSort: bubbleSort,
    selectionSort: selectionSort,
    insertionSort: insertionSort,
    shellSort: shellSort,
    quickSort: quickSort
  };
})();

// Створення тестових масивів
function runTests() {
  const normalArray = [];

  for (let i = 0; i < 120; i++) {
    normalArray.push((i * 37 + 19) % 200 + 1);
  }

  const sparseArray = normalArray.slice();

  delete sparseArray[7];
  sparseArray[25] = undefined;
  delete sparseArray[63];
  sparseArray[100] = undefined;

  const methods = [
    ['Bubble Sort', SortLib.bubbleSort],
    ['Selection Sort', SortLib.selectionSort],
    ['Insertion Sort', SortLib.insertionSort],
    ['Shell Sort', SortLib.shellSort],
    ['Quick Sort (Hoare)', SortLib.quickSort]
  ];

  const arrays = [
    ['Нерозріджений масив', normalArray],
    ['Розріджений масив', sparseArray]
  ];

  for (const test of arrays) {
    const arrayName = test[0];
    const originalArray = test[1];

    console.log('\n' + arrayName);
    console.log('Довжина масиву: ' + originalArray.length);
    console.log('Початковий масив:');
    console.log(originalArray);

    for (const order of ['asc', 'desc']) {
      console.log('\nСортування за ' +
        (order === 'asc' ? 'зростанням' : 'спаданням'));

      for (const method of methods) {
        const name = method[0];
        const sortFunction = method[1];

        console.log('\nМетод: ' + name);

        try {
          const result = sortFunction(originalArray.slice(), order);

          console.log('Результат:');
          console.log(result);
        } catch (error) {
          console.error('Помилка: ' + error.message);
        }
      }
    }
  }

  console.log('\nТестування завершено.');
}

// Автоматичний запуск
if (typeof window !== 'undefined') {
  runTests();
} else if (typeof module !== 'undefined' && require.main === module) {
  runTests();
}

// Експорт для Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SortLib;
}
