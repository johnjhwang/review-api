import React from "react";
import ReactDOM from "react-dom";
import _ from "underscore";


const ImageGallery = (props) => {
  // console.log(props.styles);


  if (props.pics === null) {
    console.log('images', props.pics);
      return (<div>
        <h2>Images</h2>
    </div>)
  } else {
    console.log('images', props.pics[0]);
    return (<div>
        <h2>Images</h2>
        <img src={props.pics[props.currentPic].url} height="400px" width="400px" />
        <button onClick={(e) => {props.picChangeHandler(false)}}>Left</button>
        <button onClick={(e) => {props.picChangeHandler(true)}}>Right</button>
    </div>)
  }
}

export default ImageGallery;