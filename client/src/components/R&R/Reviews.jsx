import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import styled from 'styled-components';
import handler from '../../helpers/reviewhandler.js';
import ReviewsSort from './ReviewsSort.jsx';
import ReviewList from './ReviewList.jsx';
import MoreReviews from './MoreReviews.jsx';
import NewReview from './NewReview.jsx';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: this.props.reviewsData.results,
      visible: 2
    }
    this.showMoreReviews = this.showMoreReviews.bind(this);
  }

  componentDidMount() {
    this.setState(
      { reviews: this.props.reviewsData.results }
    )
  }

  componentDidUpdate(prevProps) {
    if (this.state.reviews !== this.props.reviewsData.results){
      this.setState(
        { reviews: this.props.reviewsData.results }
      )
    }
  }

  showMoreReviews() {
    this.setState({
      visible: this.state.visible + 2
    })
  }

  // stars, loading more questions/reviews, adding a question/review,
  // styled-components
  // All reviews will be saved per product.  Specific styles will not be accounted for within the review module.

  render () {
    const { reviewsData } = this.props;

    return (<div>
        <ReviewsSort total={this.state.reviews && this.state.reviews.length} updateReviews={this.props.updateReviews}/>
        <ReviewList reviews={this.state.reviews} visible={this.state.visible}/>
        <MoreReviews total={this.state.reviews && this.state.reviews.length} visible={this.state.visible} showMoreReviews={this.showMoreReviews}/>
        <NewReview/>
    </div>)
  }
}


export default Reviews;

