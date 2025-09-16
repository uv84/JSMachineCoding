function flattenArray(...args) {
    let result = [];

    function flatten(item) {
        if (Array.isArray(item)) {
            for (const subItem of item) {
                flatten(subItem);
            }
        } else if (typeof item === 'object' && item !== null) {
            for (const [key, value] of Object.entries(item)) {
                result.push(value); // You could also push `{key: value}` if preferred
            }
        } else {
            result.push(item);
        }
    }

    for (const arg of args) {
        flatten(arg);
    }

    return result;
}
const ans = flattenArray([1, 2, [3, 4]], { a: 5, b: { c: 6 } }, 7, [8, [9, 10]]);
  console.log(ans);