// const MODEL_URL = '/models';
import "./assets/css/style.css";
import * as faceapi from "face-api.js";
const video = document.getElementById("videoHolder");

const {
  tinyFaceDetector,
  faceLandmark68Net,
  faceExpressionNet,
  faceRecognitionNet,
  ssdMobilenetv1
} = faceapi.nets;

Promise.all([
  tinyFaceDetector.loadFromUri("/models"),
  faceLandmark68Net.loadFromUri("/models"),
  faceExpressionNet.loadFromUri("/models"),
  faceRecognitionNet.loadFromUri("/models"),
  ssdMobilenetv1.loadFromUri("/models")
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

video.addEventListener("play", async e => {
  const displaysize = { width: video.width, height: video.height };
  const canvas = faceapi.createCanvasFromMedia(video, displaysize);

  const labelDesc = await loadAllLabelUsers();
  const faceMacher = new faceapi.FaceMatcher(labelDesc, 0.8);
  document.body.append(canvas);

  setInterval(async () => {
    const detections = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions().withFaceDescriptors();
    let resizedDetections = faceapi.resizeResults(detections, displaysize);
    canvas.getContext("2d").clearRect(0, 0, video.width, video.height);

    const results =  resizedDetections.map(x => {
      return faceMacher.findBestMatch(x.descriptor);
    });
    results.map((r,i)=>{
        const box = resizedDetections[i].detection.box;
        const drawBox = new faceapi.draw.DrawBox(box, { label: r.toString() });
        drawBox.draw(canvas);
    });
    // resizedDetections = resizedDetections.map(d => {
    //   const box = d.detection.box;
    //   const drawBox = new faceapi.draw.DrawBox(box, { label: "Face" });
    //   drawBox.draw(canvas);
    // });

    // faceapi.draw.drawDetections(canvas, resizedDetections);
    // faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
    // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
    // faceapi.detectAllFaces();
  }, 100);
});


const loadAllLabelUsers = () => {
  const users = ["sinthujan.png","abdulrahman.png","noaman.png", "jamil.png", "michael.png"];
  return Promise.all(
    users.map(async u => {
      const img = await faceapi.fetchImage(`/users/${u}`);
      const d = await faceapi
        .detectSingleFace(img)
        .withFaceLandmarks()
        .withFaceExpressions()
        .withFaceDescriptor();
      return new faceapi.LabeledFaceDescriptors(u.replace(".png", ""), [
        d.descriptor
      ]);
    })
  );
};
