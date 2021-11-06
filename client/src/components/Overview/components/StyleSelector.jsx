import React from "react";

import _ from "underscore";

import AddToCart from "./AddToCart.jsx";



const StyleSelector = (props) => {
  // console.log(props.styles);

  let num = -1;
  let photos = null;
  if (props.styles[props.currentStyle].photos) {
    photos = props.styles[props.currentStyle].photos;
  }

  return (<div>
      <h2>Style List</h2>
      {_.map(props.styles, (s) => {
          num = num + 1;
          return (<li key={s.style_id} id={num} onClick={(e) => {props.styleHandler(e)}}>{s.name}</li>)
      })}
      <AddToCart 
      styleInfo={props.styles[props.currentStyle]} 
      quantity={props.quantity} 
      sizeHandler={props.sizeHandler} 
      priceHandler={props.priceHandler}
      />
      
  </div>)
}

export default StyleSelector;