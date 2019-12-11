import * as faceapi from 'face-api.js';
// import { speak } from './text-to-speach';
const {
  tinyFaceDetector,
  faceLandmark68Net,
  faceExpressionNet,
  faceRecognitionNet,
  ssdMobilenetv1
} = faceapi.nets;

let isSpeaking = false;

export const loadModelsAndStart = (videoElement: any) => {
  Promise.all([
    tinyFaceDetector.loadFromUri('/models'),
    faceLandmark68Net.loadFromUri('/models'),
    faceExpressionNet.loadFromUri('/models'),
    faceRecognitionNet.loadFromUri('/models'),
    ssdMobilenetv1.loadFromUri('/models')
  ]).then(() => {
    navigator.getUserMedia(
      { video: {} },
      stream => {
        (videoElement as any).srcObject = stream;
        (videoElement as any).autoplay = true;
        registerPlayEvent(videoElement);
      },
      console.error
    );
  });
};

const registerPlayEvent = (videoElement: any) => {
  let canvas: any;
  videoElement.addEventListener('play', async (e: any) => {
    const displaysize = {
      width: videoElement.width,
      height: videoElement.height
    };

    /**
     * Here we bind the camera into canvas to show the stream
     * video to the user
     */
    canvas = faceapi.createCanvasFromMedia(videoElement, displaysize);

    /**
     * holds an array of users with Description from the saved images
     */
    const labelDesc = await loadAllLabelUsers();

    /**
     * Here we match the faces from images with specific percent
     */
    const faceMacher = new faceapi.FaceMatcher(labelDesc, 0.8);

    // document.body.append(canvas);
    videoElement.parentNode.insertBefore(canvas, videoElement.nextSibling);

    setInterval(async () => {
      /**
       * Here we find/Detect faces from the streaming camera of the user.
       */
      const detections = await faceapi
        .detectAllFaces(videoElement, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions()
        .withFaceDescriptors();

      // Here we resize the detection boundary to fit the canvas/video width
      let resizedDetections = faceapi.resizeResults(detections, displaysize);

      // Clear current canvas detection
      canvas
        .getContext('2d')
        .clearRect(0, 0, videoElement.width, videoElement.height);

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
          //   !isSpeaking &&
          r.label.indexOf('unknown') === -1
        ) {
          console.log(userExpression);
          //   isSpeaking = true;

          // speak(`Hello ${r.label}`, () => (isSpeaking = !isSpeaking));
          // console.log(r);
        }
        const box = resizedDetections[i].detection.box;
        const drawBox = new faceapi.draw.DrawBox(box, { label: r.toString() });
        drawBox.draw(canvas);
      });
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

// Todo:
// Detect the user
// Get information about the user
// Allow increasing the user images in Our DB.
// Update the viewer
