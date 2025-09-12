function debounce(fn, delay) {
    let timer;
    // Your implementation
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args),
            delay);
    }
}

//For the purpose of user debugging.
//pass appropriate input in below function call
debounce();
const debouncedFn = debounce(() => console.log('Function called!'), 1000);
debouncedFn();
debouncedFn();
debouncedFn();
setTimeout(debouncedFn, 1500); // This call should execute the function after 1 second