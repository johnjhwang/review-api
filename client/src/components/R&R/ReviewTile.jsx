import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';





const ReviewTile = ({ review }) => {



  // stars, loading more questions/reviews, adding a question/review,
  // styled-components
  // All reviews will be saved per product.  Specific styles will not be accounted for within the review module.
  // 39333 to 40343



  return (<div>
    <br/>
    {review.rating} stars {review.reviewer_name}, {review.date}
    <br />
    {review.summary}
    <br />
    {review.body}
    <br/>
  </div>);

}


export default ReviewTile;
