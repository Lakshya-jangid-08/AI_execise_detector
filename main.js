const videoElement = document.getElementsByClassName('input_video')[0];
const canvasElement = document.getElementsByClassName('output_canvas')[0];
const canvasCtx = canvasElement.getContext('2d');
const pose = new Pose({
  locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
  }
});
pose.setOptions({
  modelComplexity: 1,
  smoothLandmarks: true,
  enableSegmentation: false,
  smoothSegmentation: true,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
});
pose.onResults(onPoseResults);
function onPoseResults(results) {
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.drawImage(
    results.image, 0, 0, canvasElement.width, canvasElement.height);
  drawPoseLandmarks(results.poseLandmarks);
  canvasCtx.restore();
}
function drawPoseLandmarks(landmarks) {}
const camera = new Camera(videoElement, {
  onFrame: async () => {
    await pose.send({image: videoElement});
  },
  width: 1280,
  height: 720
});
camera.start();
const poseDetector = new PoseDetector(new FeedbackRenderer('threejs-container'));
document.getElementById('squats-btn').addEventListener('click', () => {
  poseDetector.setCurrentExercise('squats');
  poseDetector.startCamera();
});
document.getElementById('pushups-btn').addEventListener('click', () => {
  poseDetector.setCurrentExercise('pushups');
  poseDetector.startCamera();
});