import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import styled from 'styled-components';
import handler from '../Shared/reviewhandler.js';
import Reviews from './Reviews.jsx';
import Ratings from './Ratings.jsx';


class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product_id: this.props.product_id,
      reviewsData: {},
      reviewsMetaData: {},
      name: ''
    }
    this.getReviews = this.getReviews.bind(this);
    this.getReviewsMeta = this.getReviewsMeta.bind(this);
    this.updateReviews = this.updateReviews.bind(this);
    this.getProductName = this.getProductName.bind(this);
  }

  componentDidMount() {
    this.getReviews();
    this.getReviewsMeta();
    this.getProductName();
  }

  componentDidUpdate(prevProps) {
    if (this.props.product_id !== prevProps.product_id) {
      this.getReviews();
      this.getReviewsMeta();
      this.getProductName();

    }
  }

  getReviews(sort = 'relevant') {
    handler.get(this.state.product_id, sort, (responseData) => {
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

  updateReviews() {
    this.getReviews();
    this.getReviewsMeta();
  }

  getProductName() {
    axios.get(`/products/${this.props.product_id}`)
      .then((responseData) => {
        console.log('result', responseData.data.name);
        this.setState({
          name: responseData.data.name,
        });
      })
      .catch((err) => {
        console.log("Error getting product name");
      });
  }
  // stars, filter reviews by rating, show characteristics, adding a question/review (XXXXL)
  // styled-components

  // 39333 to 40343

  render () {
    return (
      <Flex>
        <RatingsStyle><Ratings reviewsMetaData={this.state.reviewsMetaData}/></RatingsStyle>
        <ReviewsStyle><Reviews reviewsData={this.state.reviewsData} reviewsMetaData={this.state.reviewsMetaData} getReviews={this.getReviews} updateReviews={this.updateReviews} name={this.state.name}/></ReviewsStyle>
      </Flex>
    )
  }
}

const Flex = styled.div`
  display: flex;
  flex-wrap: nowrap;
  padding: 10px;
  gap: 10px;
  width: 95%;
`

const RatingsStyle = styled.div`
  padding-left: 10px;
  flex: 1 0 20%;
`
const ReviewsStyle = styled.div`
  flex: 0 1 80%;
`




export default Overview;
