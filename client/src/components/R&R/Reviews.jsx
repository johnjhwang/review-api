import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import styled from 'styled-components';
import handler from '../../helpers/reviewhandler.js';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product_id: 39336,
      reviewsData: {}
    }
  }

  componentDidMount() {
    this.getReviews();
  }

  getReviews() {
    handler.get(this.state.product_id, (responseData) => {
      console.log('client responseData >>>>', responseData);
      this.setState({ reviewsData: responseData });
    })

  }
  // stars, loading more questions/reviews, adding a question/review,
  // styled-components
  // All reviews will be saved per product.  Specific styles will not be accounted for within the review module.

  render () {
    return (<div>
        Reviews
        {this.state.reviewsData.product}
    </div>)
  }
}


export default Reviews;

