import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import styled from 'styled-components';
import handler from '../../helpers/reviewhandler.js';
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
    return (<div>
      <Flex>
        <Ratings reviewsMetaData={this.state.reviewsMetaData}/>
        <Reviews reviewsData={this.state.reviewsData} reviewsMetaData={this.state.reviewsMetaData} getReviews={this.getReviews} updateReviews={this.updateReviews} name={this.state.name}/>
      </Flex>
    </div>)
  }
}

const Flex = styled.div`
  display: flex;
  padding: 10px;
  gap: 20px;
`;

export default Overview;
