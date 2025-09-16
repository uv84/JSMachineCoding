var status = '😎';

setTimeout(function () {
  const status = '😍';

  const data = {
    status: '🥑',
    getStatus() {
      return this.status;
    },
  };

  console.log(data.getStatus());             // 🥑
  console.log(data.getStatus.call(globalThis));    // ❓
}, 0);