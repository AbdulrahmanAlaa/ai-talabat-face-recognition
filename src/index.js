// const MODEL_URL = '/models';
import "./content/css/style.css";
import * as faceapi from "face-api.js";
const video = document.getElementById("videoHolder");

const {
  tinyFaceDetector,
  faceLandmark68Net,
  faceExpressionNet,
  faceRecognitionNet
} = faceapi.nets;

console.log(faceapi);
Promise.all([
  tinyFaceDetector.loadFromUri("/models"),
  faceLandmark68Net.loadFromUri("/models"),
  faceExpressionNet.loadFromUri("/models"),
  faceRecognitionNet.loadFromUri("/models")
]).then(startVideo);

function startVideo() {
    navigator.getUserMedia(
      { video: {} },
      stream => {
        video.srcObject = stream;
      },
      console.error
    );
  }


video.addEventListener("play", e => {
    const displaysize = { width: video.width, height: video.height };
    const canvas = faceapi.createCanvasFromMedia(video,displaysize);
    document.body.append(canvas);
  
  setInterval(async () => {
    const detections = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions();
    const resizedDetections = faceapi.resizeResults(detections, displaysize);
    canvas.getContext("2d").clearRect(0, 0, video.width, video.height);
    faceapi.draw.drawDetections(canvas, resizedDetections);
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
    console.log(detections);
  }, 100);
});
