import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Header } from './components/header';
import Video from './index';
ReactDOM.render(
  <>
    <Header />
    <div className="main">
      <Video/>
    </div>
  </>,
  document.getElementById('app')
);



// Todo:- 
// Loading for resources
// Adding new image to the running app
// Adding new face/user ability 
// Adding images to existing face
// Validating and greeting once in the hour with facial expression smart way 
// Integrate with fingerprint 


