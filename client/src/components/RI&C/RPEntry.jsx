import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import axios from "axios";
import styled from 'styled-components';

class RPEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productInfo: {},
      productStyle: {}
    };

  }

  componentDidMount() {
    this.getProductInfo(),
    this.getProductStyle()
  }
  //////////////////////////////////////////////////////////////////////////////////
  getProductInfo() {
    const id = this.props.relatedProductId;
    axios.get(`products/${id}`)
      .then((results) => {
        //console.log('Results in getProductInfo: ', results.data)
        this.setState({
          productInfo: results.data
        })
      })
      .catch((err) => {
        console.log('Error in getProductInfo')
      })
  }

  getProductStyle() {
    const id = this.props.relatedProductId;
    axios.get(`products/${id}/styles`)
      .then((results) => {
        //console.log('Results in getProductInfo: ', results.data)
        this.setState({
          productStyle: results.data
        })
      })
      .catch((err) => {
        console.log('Error in getProductInfo')
      })
  }

  //////////////////////////////////////////////////////////////////////////////////

  render() {
    //console.log(this.state.productStyle.results[0].photos[0].ur)
    const results = this.state.productStyle.results
    if (results) {let image = this.state.productStyle.results[0].photos[0].url}
    const {category, name, default_price} = this.state.productInfo
    return (
      <div >

        Category: {category}
        Name: {name}
        Price: {default_price}
        Image: {results ? <img src={this.state.productStyle.results[0].photos[0].url}></img> : 'null'}

      </div>
    );
  }


}




export default RPEntry;