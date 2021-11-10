import React from "react";
import _ from "underscore";
import styled from "styled-components";


const ImageGallery = (props) => {
  // console.log(props.styles);


  if (props.pics === null) {
    console.log('images', props.pics);
      return (<div>
        <h2>Images</h2>
        <Gallery>

        </Gallery>
    </div>)
  } else {
    console.log('images', props.pics[0]);
    return (<div>
        <h2>Images</h2>
        <Gallery>
        <Image url={props.pics[props.currentPic].url} />
        </Gallery>
        <button onClick={(e) => {props.picChangeHandler(false)}}>Left</button>
        <button onClick={(e) => {props.picChangeHandler(true)}}>Right</button>
    </div>)
  }
}

const Image = styled.img`
  width: 200px;
  height: 290px;
  // border: solid;
  background-image: url(${props => props.url});
  background-repeat: no-repeat;
  background-size: 100% 100%;
`;

const Gallery = styled.div`
width: 400px;
height: 300px;
box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 10%), 0 0 0 1px rgb(10 10 10 / 2%);
border-radius: 0.25rem;
margin: 8px;
border: 1px solid grey;
`;


export default ImageGallery;