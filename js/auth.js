import { getEmbedding } from "./faceEngine.js";
import { saveEmbedding, loadEmbedding } from "./storage.js";
import { CONFIG } from "./config.js";

export async function register(video) {
  const embedding = await getEmbedding(video);
  await saveEmbedding(embedding);
}

export async function authenticate(video) {
  const saved = await loadEmbedding();
  if (!saved) throw new Error("No face registered");

  const current = await getEmbedding(video);
  const distance = faceapi.euclideanDistance(saved, current);

  return distance < CONFIG.THRESHOLD;
}