import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Header } from './components/header';
import Video from './index';
ReactDOM.render(
  <>
    <Header />
    <div className="main">
     {/* <button id="takeImage">Take Photo</button>
      <img id="img" />  */}
      <Video/>
    </div>
  </>,
  document.getElementById('app')
);
