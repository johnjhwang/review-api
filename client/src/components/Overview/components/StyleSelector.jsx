import React from "react";

import _ from "underscore";

import AddToCart from "./AddToCart.jsx";
import ImageGallery from "./ImageGallery.jsx";

import styled from "styled-components";



const StyleSelector = (props) => {
  // console.log(props.styles);

  let num = -1;
  let photos = null;
  if (props.styles[props.currentStyle].photos) {
    photos = props.styles[props.currentStyle].photos;
  }

  return (<div>
    <Cart>
    <AddToCart 
    styleInfo={props.styles[props.currentStyle]} 
    quantity={props.quantity} 
    sizeHandler={props.sizeHandler} 
    priceHandler={props.priceHandler}
    />
    <p>Total is: {props.price}</p>
        
    <button onClick={(e) => {props.cartHandler()}}>Add to Cart</button>
  </Cart>
  <ImageGallery 
    pics={photos || null} 
    picIndex={props.picIndex}
    handlePictureChange={props.picHandler}
  />
  
    <div>
      <h2>Style List</h2>
      {_.map(props.styles, (s) => {
          num = num + 1;
          // let url =  || ;
          console.log('s', s);
          if (s !== 'default') {
           return (<Style id={num} url={s.photos[0].thumbnail_url} onClick={(e) => {props.styleHandler(e)}} />)
          } else {
            return (<li key={s.style_id} id={num} onClick={(e) => {props.styleHandler(e)}}>{s.name}</li>)
          }
      })}
    </div>
  </div>)
}

const Cart = styled.div`
width: 400px;
height: 300px;
box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 10%), 0 0 0 1px rgb(10 10 10 / 2%);
border-radius: 0.25rem;
margin: 8px;
border: 1px solid grey;
float: right;
`;

const Style = styled.div`
width: 50px;
height: 50px;
border: solid;
border-radius: 20rem;
background-image: url(${props => props.url});
background-repeat: no-repeat;
background-size: 100% 100%;
margin: 0 auto;
float: left;
`;


export default StyleSelector;