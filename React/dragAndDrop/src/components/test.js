Array.prototype.myReduce = function (callback, initialValue) {
  if (typeof callback !== 'function') {
    throw new TypeError('Callback must be a function');
  }

  const arr = this;
  const hasInitialValue = arguments.length > 1;
  let accumulator = hasInitialValue ? initialValue : undefined;
  let startIndex = hasInitialValue ? 0 : 1;

  if (!hasInitialValue && arr.length === 0) {
    throw new TypeError('Reduce of empty array with no initial value');
  }

  if (!hasInitialValue) {
    // Find first defined value in sparse array
    for (let i = 0; i < arr.length; i++) {
      if (i in arr) {
        accumulator = arr[i];
        startIndex = i + 1;
        break;
      }
    }
    if (accumulator === undefined) {
      throw new TypeError('Reduce of empty array with no initial value');
    }
  }

  for (let i = startIndex; i < arr.length; i++) {
    if (i in arr) {
      accumulator = callback(accumulator, arr[i], i, arr);
    }
  }

  return accumulator;
};

let students = [
  { name: "Piyush", rollNumber: 31, marks: 80 },
  { name: "Jenny", rollNumber: 15, marks: 69 },
  { name: "Kaushal", rollNumber: 16, marks: 35 },
  { name: "Dilpreet", rollNumber: 7, marks: 55 },
];

let totalMarks = students.myReduce((acc, emp) => acc + emp.marks, 0);
console.log(totalMarks);