function formatList(items) {
  // your implementation
 
  let n = items.length;
  if (n === 0) return "";
  if (n === 1) return items[0];

  let ans = "";
  for (let i = 0; i < items.size; i++){
    if (i === n - 2) {
      ans += " and " + items[i];
    }
    else {
      ans += " " + items[i];
    }
  }
}

//For the purpose of user debugging.
formatList(["apple", "banana"]);

module.exports = formatList;