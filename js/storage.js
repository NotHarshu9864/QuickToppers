import { openDB } from "https://unpkg.com/idb?module";

const DB = "FaceAuthDB";
const STORE = "data";

export async function saveEmbedding(embedding) {
  const db = await openDB(DB, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE);
      }
    }
  });
  await db.put(STORE, embedding, "face");
}

export async function loadEmbedding() {
  const db = await openDB(DB, 1);
  return db.get(STORE, "face");
}