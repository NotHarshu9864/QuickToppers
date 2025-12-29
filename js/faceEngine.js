export async function loadModels() {
  const URL = "https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/weights";

  await Promise.all([
    faceapi.nets.ssdMobilenetv1.loadFromUri(URL),
    faceapi.nets.faceLandmark68Net.loadFromUri(URL),
    faceapi.nets.faceRecognitionNet.loadFromUri(URL)
  ]);
}

export async function getEmbedding(video) {
  const result = await faceapi
    .detectSingleFace(video)
    .withFaceLandmarks()
    .withFaceDescriptor();

  if (!result) throw new Error("No face detected");

  return Array.from(result.descriptor);
}