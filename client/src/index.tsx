// const MODEL_URL = '/models';
import './assets/css/style.css';
import * as faceapi from 'face-api.js';
import { speak } from './text-to-speach';
import React, { useRef, useEffect } from 'react';

const Video2 = document.createElement('video') as HTMLVideoElement;

let isSpeaking = false;
const {
  tinyFaceDetector,
  faceLandmark68Net,
  faceExpressionNet,
  faceRecognitionNet,
  ssdMobilenetv1
} = faceapi.nets;

const startVideo = () => {
  navigator.getUserMedia(
    { video: {} },
    stream => {
      Video2.srcObject = stream;
    },
    console.error
  );
};

Promise.all([
  tinyFaceDetector.loadFromUri('/models'),
  faceLandmark68Net.loadFromUri('/models'),
  faceExpressionNet.loadFromUri('/models'),
  faceRecognitionNet.loadFromUri('/models'),
  ssdMobilenetv1.loadFromUri('/models')
]).then(startVideo);

let canvas: any;
const registerPlayEvent = (Video2: any) => {
  Video2.addEventListener('play', async (e: any) => {
    const displaysize = { width: Video2.width, height: Video2.height };

    /**
     * Here we bind the camera into canvas to show the stream
     * video to the user
     */
    canvas = faceapi.createCanvasFromMedia(Video2, displaysize);

    /**
     * holds an array of users with Description from the saved images
     */
    const labelDesc = await loadAllLabelUsers();

    /**
     * Here we match the faces from images with specific percent
     */
    const faceMacher = new faceapi.FaceMatcher(labelDesc, 0.8);

    // document.body.append(canvas);
    Video2.parentNode.insertBefore(canvas, Video2.nextSibling);

    setInterval(async () => {
      /**
       * Here we find/Detect faces from the streaming camera of the user.
       */
      const detections = await faceapi
        .detectAllFaces(Video2, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions()
        .withFaceDescriptors();

      // Here we resize the detection boundary to fit the canvas/video width
      let resizedDetections = faceapi.resizeResults(detections, displaysize);

      // Clear current canvas detection
      canvas.getContext('2d').clearRect(0, 0, Video2.width, Video2.height);

      // Filter our detections/faces from the video with those we have from our DB with specific percent.
      const results = resizedDetections.map(x => {
        return faceMacher.findBestMatch(x?.descriptor);
      });

      results.map((r, i) => {
        //Ensure we have a match with 60% at least
        if (!(Math.floor(r.distance * 100) > 40)) {
          return;
        }

        // Get user face Expressions like neutral,sad ,happy
        const userExpression = detections[0]?.expressions?.asSortedArray()[0]
          ?.expression;

        if (
          userExpression &&
          !isSpeaking &&
          r.label.indexOf('unknown') === -1
        ) {
          console.log(userExpression);
          isSpeaking = true;

          // speak(`Hello ${r.label}`, () => (isSpeaking = !isSpeaking));
          // console.log(r);
        }
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
};
/**
 * get LabeledFaceDescriptors
 */
const loadAllLabelUsers = async () => {
  // Call api to get all our users
  const users: Array<any> = await (
    await fetch('http://localhost:3000/api/users')
  ).json();
  return await Promise.all(
    users.map(async u => {
      const descriptors: Array<any> = await Promise.all(
        u.images.map(async (_img: any) => {
          const img = await faceapi.fetchImage(
            `http://localhost:3000/public/users/${_img}`
          );
          return (
            await faceapi
              .detectSingleFace(img)
              .withFaceLandmarks()
              .withFaceExpressions()
              .withFaceDescriptor()
          ).descriptor;
        })
      );
      return new faceapi.LabeledFaceDescriptors(u.name, [...descriptors]);
    })
  );
};

const askToSmile = () => {};

// const takeImage = (e: Event, scale: number = 1) => {
//   const canvas = document.createElement('canvas');
//   canvas.width = video.clientWidth * scale;
//   canvas.height = video.clientHeight * scale;
//   canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

//   (document.getElementById('img') as any).src = canvas.toDataURL();
//   // # ToDo:
//   // 1- validate image boundary and expression
//   // 2- Save it to specific user.
// };
// document.getElementById('takeImage').addEventListener('click', takeImage);

// Todo:
// Detect the user
// Get information about the user
// Allow increasing the user images in Our DB.
// Update the viewer
// create our ref
export default () => {
  const videoElement = useRef();
  useEffect(() => {
    if (videoElement.current) {
      navigator.getUserMedia(
        { video: {} },
        stream => {
          (videoElement.current as any).srcObject = stream;
          (videoElement.current as any).autoplay = true;
          registerPlayEvent(videoElement.current)
        },
        console.error
      );
    }
  }, []);
  return (
    <video
      ref={videoElement}
      id='videoHolder'
      width='720'
      height='560'
      muted
    ></video>
  );
};
