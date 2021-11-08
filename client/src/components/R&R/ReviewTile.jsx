import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import handler from '../Shared/reviewhandler.js';
import dateFormatter from '../Shared/dateformatter.js';
import Stars from "../Shared/Stars.jsx";


class ReviewTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checker: false,
      reported: false
    }
  }

  handleClick = (e) => {
    let { review, updateReviews } = this.props

    let action = e.target.getAttribute('name');
    console.log('action >>', action, 'checker >>', this.state.checker);

    if (action === 'helpful' && this.state.checker === false) {

      this.setState({ checker: true });
      handler.update(review.review_id, action, (responseData) => {
        updateReviews();
      })
    }
    if (action === 'report' && this.state.reported === false) {
      this.setState({ reported: true });
      handler.update(review.review_id, action, (responseData) => {
        updateReviews();
      })
    }

  }

  render() {
    let { review, updateReviews } = this.props

    return (
      <div>
        <br/>
        <div><Stars rating={review.rating}/></div>
        <div style={{ float: 'right' }}>{review.reviewer_name}, {dateFormatter(review.date)}</div>
        <h3>{review.summary}</h3>
        {review.body}
        <br/>
        {review.recommend && <div>✅  I recommend this product</div>}
        <span>Helpful? </span>
        <span name="helpful" onClick={(e) => this.handleClick(e)} style={{textDecoration: 'underline'}}>Yes</span>
        <span> {review.helpfulness} |  </span>
        <span name="report" onClick={(e) => this.handleClick(e)} style={{textDecoration: 'underline'}}>Report</span>
      </div>
    )
  }
}

export default ReviewTile;
