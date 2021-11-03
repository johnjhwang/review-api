import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import helpers from '../../helpers/reviewhandler.js';

const Ratings = ({ reviewsMetaData }) => {

  let { ratings, recommended, characteristics } = reviewsMetaData;

  console.log('ratings', recommended);

  const getAverageRating = () => {
    let count = 0;
    let total = 0;
    for (let key in ratings) {
      total += Number(key) * Number(ratings[key]);
      count += Number(ratings[key]);
    }
    return (total / count).toFixed(1);
  };

  const getRecPercentage = () => {
    if (!recommended.true) {
      return 0;
    }
    if (!recommended.false) {
      return 100;
    }
    return Math.round((Number(recommended.true) / (Number(recommended.true) + Number(recommended.false)) * 100));
  }


  return (
     <div>
        Ratings & Reviews
        <div>Average Rating: {getAverageRating()}</div>
        {recommended && <div>{getRecPercentage()}% of Users recommend this product</div>}

        {ratings && Object.entries(ratings).map((rating) => {
          return (<div>{rating[0]} stars given by {rating[1]} people</div>)})}

        {characteristics && Object.entries(characteristics).map((characteristic) => {
          return (
            <div>{characteristic[0]} characteristic: {characteristic[1].value} </div>
          )
        })}
    </div>
  )
}

export default Ratings;

