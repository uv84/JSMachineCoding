import '@testing-library/jest-dom';
import 'fake-indexeddb/auto';

// Reset state between tests
afterEach(async () => {
  // Clear localStorage and sessionStorage
  localStorage.clear();
  sessionStorage.clear();
  
  // Reset database by deleting it
  try {
    const dbs = await indexedDB.databases();
    await Promise.all(
      dbs.map(db => {
        if (db.name) {
          return new Promise<void>((resolve) => {
            const deleteReq = indexedDB.deleteDatabase(db.name!);
            deleteReq.onsuccess = () => resolve();
            deleteReq.onerror = () => resolve();
          });
        }
        return Promise.resolve();
      })
    );
  } catch (error) {
    // Ignore errors during cleanup
  }
});