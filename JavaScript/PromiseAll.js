const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "foo");
});

// Promise.all([promise1, promise2, promise3]).then((values) => {
//   console.log(values);
// });


function promiseAll(promises) {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(promises)) {
            return reject(new TypeError("Argument must be an array"));
        }

        const results = [];
        let completed = 0;

        promises.forEach((promise, index) => {
            Promise.resolve(promise)
                .then(value => {
                    results[index] = value;
                    completed++;

                    if (completed === promises.length) {
                        resolve(results);
                    }
                })
                .catch(reject); // Reject immediately on any failure
        });

        // Handle empty array case
        if (promises.length === 0) {
            resolve([]);
        }
    });
}
promiseAll([promise1, promise2, promise3]).then((values)=> {console.log(values)})



