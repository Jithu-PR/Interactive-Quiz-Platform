export const openDatabase = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('QuizDB', 1);

    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains('quizData')) {
        db.createObjectStore('quizData', {
          keyPath: 'id',
          autoIncrement: true,
        });
      }
    };

    request.onsuccess = (e) => {
      resolve(e.target.result);
    };

    request.onerror = (e) => {
      reject('Error opening database: ' + e.target.errorCode);
    };
  });
};

export const saveQuizData = (data) => {
  openDatabase().then((db) => {
    const transaction = db.transaction('quizData', 'readwrite');
    const store = transaction.objectStore('quizData');
    store.put(data);

    transaction.oncomplete = () => {
      console.log('Quiz data saved.');
    };

    transaction.onerror = (e) => {
      console.error('Error saving quiz data:', e.target.errorCode);
    };
  });
};

export const getQuizData = () => {
  return new Promise((resolve, reject) => {
    openDatabase().then((db) => {
      const transaction = db.transaction('quizData', 'readonly');
      const store = transaction.objectStore('quizData');
      const request = store.getAll();

      request.onsuccess = (e) => {
        resolve(e.target.result);
      };

      request.onerror = (e) => {
        reject('Error retrieving quiz data: ' + e.target.errorCode);
      };
    });
  });
};

export const clearQuizData = () => {
  openDatabase().then((db) => {
    const transaction = db.transaction('quizData', 'readwrite');
    const store = transaction.objectStore('quizData');

    store.clear();

    transaction.oncomplete = () => {
      console.log('All quiz data cleared.');
    };

    transaction.onerror = (e) => {
      console.error('Error clearing quiz data:', e.target.errorCode);
    };
  });
};
