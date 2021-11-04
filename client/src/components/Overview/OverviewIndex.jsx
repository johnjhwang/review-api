// Overview

import React from "react";

import axios from "axios";
import StyleSelector from "./components/StyleSelector.jsx";


class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productSelected: {name: null},
      productStyles: ["default"],
      productPrice: 0,
      styleSelected: 0,
      quantity: [0]
    }
    this.productGetter.bind(this);
    this.productGetter(39333);
  }

  productGetter (id) {
    console.log('Getting products...', id);
    axios.get(`/products/${id}`).then((data) => {
      // Grabbing product information, including current style
      console.log(data.data);
      this.setState({
        productSelected: data.data.product, 
        productStyles: data.data.styles, 
        productPrice: data.data.product.default_price
      });
    });
  }

  handleStyleChange (e) {
    this.setState({styleSelected: e.target.getAttribute("id")});
  }

  handleSizeChange (e) {
    console.log('Quantity', e);
    let arr = [0]
    for (var i = 0; i < e; i++) {
      arr.push(i+1);
    }
    this.setState({quantity: arr});
  }

  render () {
    return (
      <div>
        <h1>{this.state.productSelected.name}</h1>
        <h2>{this.state.productStyles[this.state.styleSelected].name}</h2>
        <p>{this.state.productSelected.description}</p>
        <StyleSelector 
        styles={this.state.productStyles} 
        styleHandler={this.handleStyleChange.bind(this)} 
        sizeHandler={this.handleSizeChange.bind(this)} 
        currentStyle={this.state.styleSelected} 
        quantity={this.state.quantity} 
        />
        
      </div>
    )
  }
}

export default Overview;

