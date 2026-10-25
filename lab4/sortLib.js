
var SortLib = (function () {
  'use strict';

  // Підрахунок елементів undefined
  function countUndefined(arr) {
    let count = 0;

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === undefined) {
        count++;
      }
    }

    return count;
  }

  // Перевірка необхідності обміну елементів
  function needSwap(a, b, order) {
    return order === 'desc' ? a < b : a > b;
  }

  // Перевірка, чи кращий поточний елемент
  function isBetter(a, b, order) {
    return order === 'desc' ? a > b : a < b;
  }

  // Визначення порядку сортування
  function normalizeOrder(order) {
    return order === 'desc' ? 'desc' : 'asc';
  }

  // Повідомлення про undefined
  function reportSparse(undefinedCount, totalLength, methodName) {
    if (undefinedCount > 0) {
      console.log(
        '[' + methodName + '] Знайдено undefined: ' +
        undefinedCount + ' із ' + totalLength +
        '. Елементи переміщено в кінець.'
      );
    }
  }

  // Виведення статистики
  function reportStats(methodName, order, comparisons, swaps, label) {
    const orderName = order === 'desc' ? 'спадання' : 'зростання';

    console.log(
      '[' + methodName + '] Порядок: ' + orderName +
      ' | Порівнянь: ' + comparisons +
      ' | ' + label + ': ' + swaps
    );
  }

  // Підготовка масиву до сортування
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

  // Формування результату
  function finishSort(arr, undefinedCount) {
    return arr.concat(new Array(undefinedCount).fill(undefined));
  }

  // 1. Сортування обміном (Bubble Sort)
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

    reportStats('bubbleSort', order, comparisons, swaps, 'Обмінів');
    reportSparse(undefinedCount, inputArr.length, 'bubbleSort');

    return finishSort(arr, undefinedCount);
  }

  // 2. Сортування вибором (Selection Sort)
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

    reportStats('selectionSort', order, comparisons, swaps, 'Обмінів');
    reportSparse(undefinedCount, inputArr.length, 'selectionSort');

    return finishSort(arr, undefinedCount);
  }

  // 3. Сортування вставками (Insertion Sort)
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

    reportStats('insertionSort', order, comparisons, moves, 'Переміщень');
    reportSparse(undefinedCount, inputArr.length, 'insertionSort');

    return finishSort(arr, undefinedCount);
  }

  // 4. Сортування Шелла (Shell Sort)
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

    reportStats('shellSort', order, comparisons, moves, 'Переміщень');
    reportSparse(undefinedCount, inputArr.length, 'shellSort');

    return finishSort(arr, undefinedCount);
  }

  // 5. Швидке сортування Хоара (Quick Sort)
  function quickSort(inputArr, order) {
    order = normalizeOrder(order);

    const prepared = prepareArray(inputArr);
    const arr = prepared.arr;
    const undefinedCount = prepared.undefinedCount;

    let comparisons = 0;
    let swaps = 0;

    // Обмін двох елементів
    function swap(a, i, j) {
      const temp = a[i];
      a[i] = a[j];
      a[j] = temp;
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

    reportStats('quickSort', order, comparisons, swaps, 'Обмінів');
    reportSparse(undefinedCount, inputArr.length, 'quickSort');

    return finishSort(arr, undefinedCount);
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

function runTests() {
  console.log('ТЕСТУВАННЯ SortLib');

  // Початковий тестовий масив
  const testArray = [45, 12, 78, 3, 56, 12, undefined, 34];

  console.log('\nПочатковий масив:');
  console.log(testArray);

  // Список алгоритмів сортування
  const methods = [
    ['Bubble Sort', SortLib.bubbleSort],
    ['Selection Sort', SortLib.selectionSort],
    ['Insertion Sort', SortLib.insertionSort],
    ['Shell Sort', SortLib.shellSort],
    ['Quick Sort (Hoare)', SortLib.quickSort]
  ];

  // Перевірка сортування за зростанням і спаданням
  for (const order of ['asc', 'desc']) {
    if (order === 'asc') {
      console.log('Сортування за зростанням');
    } else {
      console.log('Сортування за спаданням');
    }
    for (const method of methods) {
      const name = method[0];
      const sortFunction = method[1];

      console.log('\n--- ' + name + ' ---');

      try {
        // Передаємо копію, щоб зберегти початковий масив
        const result = sortFunction(testArray.slice(), order);

        console.log('Результат сортування:');
        console.log(result);
      } catch (error) {
        console.error('Помилка в алгоритмі ' + name + ':', error.message);
      }
    }
  }

  console.log('Тестування завершено');
}
// Автоматично запускаємо тести, якщо файл запущено через Node.js
if (typeof module !== 'undefined' && require.main === module) {
  runTests();
}
