import './assets/css/style.css';
import React, { useRef, useEffect } from 'react';
import { loadModelsAndStart } from './common/faceAPI';

export default () => {
  const videoElement = useRef();
  useEffect(() => {
    if (videoElement.current) {
      loadModelsAndStart(videoElement.current);
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
