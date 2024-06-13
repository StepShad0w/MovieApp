import { openDB } from 'idb';

const DB_NAME = 'movieDB';
const DB_VERSION = 1;
const STORE_NAME = 'favorites';

const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    },
  });
};

export const getFavorites = async () => {
  const db = await initDB();
  return db.getAll(STORE_NAME);
};

export const saveFavorite = async (movie) => {
  const db = await initDB();
  return db.put(STORE_NAME, movie);
};

export const removeFavorite = async (id) => {
  const db = await initDB();
  return db.delete(STORE_NAME, id);
};
