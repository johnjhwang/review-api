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
      name: '',
      filters: [],
    }
    this.getReviews = this.getReviews.bind(this);
    this.getReviewsMeta = this.getReviewsMeta.bind(this);
    this.updateReviews = this.updateReviews.bind(this);
    this.getProductName = this.getProductName.bind(this);
    this.updateFilters = this.updateFilters.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
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

  updateFilters(e) {
    let clickedRating = e.target.getAttribute('value');
    let i = this.state.filters.indexOf(clickedRating);
    if (i === -1) {
      this.setState((prevState) => ({ filters: [...prevState.filters, clickedRating] }), () => console.log('filters >>>', this.state.filters));
    } else {
      this.setState((prevState) => ({ filters: [...prevState.filters.slice(0, i), ...prevState.filters.slice(i + 1)]}), () => console.log('filters >>>', this.state.filters));
    }
  }

  clearFilters() {
    this.setState({ filters: [] });
  }
  // filter reviews by rating, show characteristics, adding a question/review (XXXXL)
  // 39333 to 40343

  render () {
    return (
      <Flex>
        <RatingsStyle>
          <Ratings reviewsMetaData={this.state.reviewsMetaData} updateFilters={this.updateFilters} filters={this.state.filters} clearFilters={this.clearFilters}/>
        </RatingsStyle>
        <ReviewsStyle>
          <Reviews reviewsData={this.state.reviewsData} reviewsMetaData={this.state.reviewsMetaData} getReviews={this.getReviews}
          updateReviews={this.updateReviews} name={this.state.name} filters={this.state.filters}/>
        </ReviewsStyle>
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
  flex: 1 0 18%;
`
const ReviewsStyle = styled.div`
  flex: 0 1 82%;
`




export default Overview;
