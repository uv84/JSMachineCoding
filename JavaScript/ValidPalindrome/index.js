function validatePalindrome(str) {
    // Your implementation
 const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  const reversed = cleaned.split('').reverse().join('');
  return cleaned === reversed;

}

//For the purpose of user debugging.
console.log(validatePalindrome("121")) ;