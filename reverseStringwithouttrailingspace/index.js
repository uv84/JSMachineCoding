function reverseWords(s) {
    const words = s.split(/\s+/).filter(word => word.length > 0).reverse().join(" ");
    return words;

}
console.log(reverseWords("  hello world  ")); // Output: "world hello"
console.log(reverseWords("a good   example"));