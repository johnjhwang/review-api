import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import handler from '../Shared/reviewhandler.js';
import Stars from "../Shared/Stars.jsx";


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
        <div style={{fontSize: '50px', textDecoration: 'bold', display: 'inline'}}>{getAverageRating()}</div><div style={{display: 'inline'}}><Stars rating={getAverageRating()}/></div>
        {recommended && <div>{getRecPercentage()}% of Users recommend this product</div>}
        <br />
        {ratings && Object.entries(ratings).map((rating) => {
          return (<div>{rating[0]} stars: {rating[1]} people  </div>)})}
        <br />
        {characteristics && Object.entries(characteristics).map((characteristic) => {
          return (
            <div>{characteristic[0]} characteristic: {characteristic[1].value} </div>
          )
        })}
    </div>
  )
}

export default Ratings;

