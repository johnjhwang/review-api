import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import handler from '../../helpers/reviewhandler.js';
import dateFormatter from '../../helpers/dateformatter.js';





const ReviewTile = ({ review, updateReviews }) => {



  // stars, loading more questions/reviews, adding a question/review,
  // styled-components
  // All reviews will be saved per product.  Specific styles will not be accounted for within the review module.
  // 39333 to 40343
  const handleClick = (e) => {
    console.log('handleClick target', e.target.getAttribute('name'));
    let action = e.target.getAttribute('name');
    handler.update(review.review_id, action, (responseData) => {
      updateReviews();
    })

  }


  return (
    <div>
      <br/>
      {review.rating} stars {review.reviewer_name}, {dateFormatter(review.date)}
      <br />
      {review.summary}
      <br />
      {review.body}
      <br/>
      {review.recommend && <div>✅  I recommend this product</div>}
      <span>Helpful? </span>
      <span name="helpful" onClick={(e) => handleClick(e)} style={{textDecoration: 'underline'}}>Yes</span>
      <span> {review.helpfulness} |  </span>
      <span name="report" onClick={(e) => handleClick(e)} style={{textDecoration: 'underline'}}>Report</span>
    </div>


  );

}


export default ReviewTile;
