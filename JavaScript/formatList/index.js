function formatList(items) {
  if (!Array.isArray(items)) {
    throw new TypeError("Input must be an array");
  }

  let n = items.length;
  if (n === 0) return "";
  if (n === 1) return items[0];

  let ans = "";
  for (let i = 0; i < n; i++) {
    if (i === n - 1) {
      ans += " and " + items[i];
    } else if (i === 0) {
      ans += items[i];
    } else {
      ans += ", " + items[i];
    }
  }

  return ans;
}

// For debugging
console.log(formatList(["apple", "banana"]));