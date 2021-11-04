import React from "react";

import _ from "underscore";


const AddToCart = (props) => {
  console.log("Cart Adding System");
//   console.log(props.styleInfo);

//   let handleNewStyle = (event) => {
//     console.log(event.target.getAttribute("id"));

//   }
  let sizeDetails = {default: {quantity: 0, size: 'unfathomable'}};
  let sizes = [props.styleInfo];
  if (props.styleInfo !== 'default') {
    sizeDetails = props.styleInfo.skus
    sizes = Object.keys(sizeDetails);
    console.log('sizes', sizes);
  } 
  

  return (<div>
    <h2>Add to Cart</h2>
    <h3>Select Size</h3>
    <select onChange={(e) => {props.handler(e.target.options[e.target.selectedIndex].getAttribute("quant"))}}>
    <option value={null} quant={[0]} > Choose Size </option>
      {_.map(sizes, (k) => {
        
        return (<option value={"" + k} quant={sizeDetails[k].quantity} > {sizeDetails[k].size} </option>)
      })}
    </select>
    <h3>Select Quantity</h3>
    <select>
      {_.map(props.quantity, (q) => {
        return (<option value={"" + q}> {q} </option>)
      })}
    </select>
  </div>)
}

export default AddToCart;