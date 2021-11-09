import React from "react";

import _ from "underscore";

import AddToCart from "./AddToCart.jsx";

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
        
    <button onClick={(e) => {this.cartHandler()}}>Add to Cart</button>
  </Cart>
    <div>
      <h2>Style List</h2>
      {_.map(props.styles, (s) => {
          num = num + 1;
          return (<li key={s.style_id} id={num} onClick={(e) => {props.styleHandler(e)}}>{s.name}</li>)
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

export default StyleSelector;