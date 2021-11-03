import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import styled from 'styled-components';
import handler from '../../helpers/reviewhandler.js';



class NewReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    this.getReviews();
    this.getReviewsMeta();
  }

  componentDidUpdate(prevProps) {
    if (this.props.product_id !== prevProps.product_id) {
      this.getReviews();
      this.getReviewsMeta();
    }
  }

  getReviews() { // no sort yet
    handler.get(this.state.product_id, (responseData) => {
      console.log('client responseData >>>>', responseData);
      this.setState({ reviewsData: responseData }, () => {
        console.log('this.state.reviewsData >>>', this.state.reviewsData);
      });
    })
  }

  getReviewsMeta() {
    handler.getMeta(this.state.product_id, (responseData) => {
      console.log('client metaData >>>>', responseData);
      this.setState({ reviewsMetaData: responseData }, () => {
        console.log('reviewsMetaData in state >>>', this.state.reviewsMetaData);
      });
    })
  }

  // stars, loading more questions/reviews, adding a question/review,
  // styled-components
  // All reviews will be saved per product.  Specific styles will not be accounted for within the review module.
  // 39333 to 40343
  render () {


    return (<div>
        Add a Review
    </div>)
  }
}

const FlexContainer = styled.div`
  display: flex;
  padding: 10px;
  gap: 100px;
  `;

export default NewReview;
