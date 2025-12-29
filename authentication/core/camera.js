export async function startCamera(videoEl) {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    throw new Error("Camera not supported");
  }

  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false
  });

  videoEl.srcObject = stream;

  return new Promise(resolve => {
    videoEl.onloadedmetadata = () => {
      videoEl.play();
      resolve();
    };
  });
}