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
      productStyle: {},
      productRatings: {}
    };

  }

  componentDidMount() {
    this.getProductInfo(),
    this.getProductStyle(),
    this.getProductRating()
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

  getProductRating() {
    const id = this.props.relatedProductId;
    axios.get(`reviews/meta/${id}`)
      .then((results) => {
        //console.log('Results in productRatings: ', results.data.ratings)
        this.setState({
          productRatings: results.data
        })
      })
      .catch((err) => {
        console.log('Error in getProductInfo')
      })
  }

  //////////////////////////////////////////////////////////////////////////////////

  render() {
    const results = this.state.productStyle.results
    const ratings = this.state.productRatings.ratings
    let avgRating = 0; let length = 0
    if (ratings) {
      let sum = 0;
      for (let key in ratings) {
        sum += key*ratings[key]
        length += Number(ratings[key])
      }
      avgRating = sum / length
      }
    const {category, name, default_price} = this.state.productInfo

    return (
      <div >

        Category: {category}
        Name: {name}
        Price: {default_price}
        Image: {results ? <img src={this.state.productStyle.results[0].photos[0].url}></img> : 'null'}
        Rating: {avgRating}

      </div>
    );
  }


}




export default RPEntry;