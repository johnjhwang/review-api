// Overview

import React from "react";
import styled from "styled-components";
import axios from "axios";
import StyleSelector from "./components/StyleSelector.jsx";
import ImageGallery from "./components/ImageGallery.jsx";

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productSelected: {name: null},
      productStyles: ["default"],
      productPrice: 0,
      totalPrice: 0,
      styleSelected: 0,
      quantity: [0],
      chosenAmount: 0,
      picIndex: 0,
      picMax: 0,
      sku: 0,
      size: null
    }
  }

  componentDidMount() {
    this.productGetter.bind(this);
    this.productGetter(39333);
  }

  productGetter (id) {
    console.log('Getting products...', id);
    let store = null;
    axios.get(`/products/${id}`).then((productData) => {
      // Grabbing product information, including current style
      console.log(productData.data);
      store = productData.data;
      axios.get(`/products/${id}/styles`).then((styleData) => {
        console.log(styleData.data);
        this.setState({
          productSelected: store, 
          productStyles: styleData.data.results, 
          productPrice: store.default_price,
          picIndex: 0,
          picMax: (styleData.data.results[0].photos.length - 1)
        });
      })
      
    });
  }

  handleStyleChange (e) {
    let ind = e.target.getAttribute("id");
    let style = this.state.productStyles[ind];
    let size_ids = Object.keys(style.skus);
    let newSku = 0;
    for (var i = 0; i < size_ids.length; i++) {
      if (style.skus[size_ids[i]].size === this.state.size) {
        newSku = size_ids[i];
      }
    }
    this.setState({
      styleSelected: ind, 
      productPrice: style.original_price, 
      picIndex: 0,
      picMax: (style.photos.length - 1),
      sku: newSku
    });
  }

  handleSizeChange (e) {
    // e is an html element
    let q = Number(e.getAttribute("quant"));
    let s = Number(e.value);
    let text = e.innerText;
    if (this.state.chosenAmount <= q) {
      this.setState({quantity: q, sku: s, size: text});
    } else {
      this.setState({quantity: q, chosenAmount: 0, sku: s, size: text});
    }
  }

  handlePriceChange (q) {
    this.setState({chosenAmount: q});
  }

  handlePictureChange (direction) {
    if (direction && this.state.picIndex < this.state.picMax) {
      this.setState({picIndex: (this.state.picIndex + 1)})
    } else if (!direction && this.state.picIndex > 0) {
      this.setState({picIndex: (this.state.picIndex - 1)})
    } else {
      console.log('what?');
    }
  }

  retrieveCart () {

  }

  sendToCart () {
    let id = this.state.sku;
    console.log(id);
    axios.post(`/cart/${id}`).then((newCart) => {
      console.log('newCart', newCart);
      
    })
    
    // if (id !== 0) {
    //   axios.post(`/cart/${id}`).then((data) => {
    //     console.log('Here after cart post');
    //     axios.get('/cart').then((newCart) => {
    //       console.log(newCart.data);
    //     })
    //   })
    // }
  }


  render () {
    return (
      <OverDiv>
        <h1>{this.state.productSelected.name}</h1>
        <h2>{this.state.productStyles[this.state.styleSelected].name}</h2>

        <p>{this.state.productSelected.description}</p>
        <StyleSelector 
        styles={this.state.productStyles} 
        styleHandler={this.handleStyleChange.bind(this)} 
        sizeHandler={this.handleSizeChange.bind(this)} 
        priceHandler={this.handlePriceChange.bind(this)}
        currentStyle={this.state.styleSelected} 
        quantity={this.state.quantity} 
        price={this.state.chosenAmount * this.state.productPrice}
        cartHandler={this.sendToCart.bind(this)}
        picHandler={this.handlePictureChange.bind(this)}
        picIndex={this.state.picIndex}
        />
        
      </OverDiv>
      
    )
  }
}

const OverDiv = styled.div`
width: 1000px;
height: 1000px;
box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 10%), 0 0 0 1px rgb(10 10 10 / 2%);
border-radius: 0.25rem;
margin: 8px;
border: 1px solid grey;
float: left;
`;

{/* <ImageGallery 
pics={this.state.productStyles[this.state.styleSelected].photos || null} 
currentPic={this.state.picIndex} 
picChangeHandler={this.handlePictureChange.bind(this)} 
/> */}

export default Overview;

