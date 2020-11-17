
const DB_NAME = 'ewa_pickup';
const STORAGE_NAME = 'orders';
const DB_VERSION = 1;
let db;

export default {

    async get() {
      return new Promise((resolve, reject) => {
        if(db) {
          return resolve(db);
        }

        const request = window.indexedDB.open(DB_NAME, DB_VERSION);
        
        request.onsuccess = (event) => {
            db = event.target.result;
            return resolve(db);
        };

        request.onerror = (error) => {
            return reject(error);
        };

        request.onupgradeneeded = (event) => {
            let db = event.target.result;
            db.createObjectStore(STORAGE_NAME, { keyPath: 'id' });
        }
      });
    },

    async saveOrder(order) {
        
        let db = await this.get();

        return new Promise((resolve, reject) => {

            let trans = db.transaction([STORAGE_NAME], 'readwrite');
            trans.oncomplete = () => {
                resolve()
            }

            trans.onerror = (err) => {
                reject(err);
            }
            let store = trans.objectStore(STORAGE_NAME);
            store.put(order);
        });
    },

    async getOrders() {

        let db = await this.get();

        return new Promise(resolve => {
            let trans = db.transaction([STORAGE_NAME], 'readonly');
            trans.oncomplete = () => {
              resolve(orders);
            }
            const store = trans.objectStore(STORAGE_NAME);
            const orders = [];
            store.openCursor().onsuccess = e => {
              const cursor = e.target.result
              if (cursor) {
                orders.push(cursor.value);
                cursor.continue();
              }
            }
        });      
    },

    async clearAll() {
      
      let db = await this.get();

      return new Promise((resolve, reject) => {

        let trans = db.transaction([STORAGE_NAME], 'readwrite');
        trans.oncomplete = () => {
            resolve();
        }

        trans.onerror = (err) => {
            reject(err);
        }
        let store = trans.objectStore(STORAGE_NAME);
        store.clear();
    });

    }
}