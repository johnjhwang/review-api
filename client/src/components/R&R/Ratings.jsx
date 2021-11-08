import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import handler from '../Shared/reviewhandler.js';
import Stars from "../Shared/Stars.jsx";
import Bars from "../Shared/Bars.jsx";


const Ratings = ({ reviewsMetaData }) => {

  let { ratings, recommended, characteristics } = reviewsMetaData;

  console.log('ratings', recommended);

  const getTotal = () => {
    let total = 0;
    for (let key in ratings) {
      total += Number(ratings[key]);
    }
    return total;
  }

  const getAverageRating = () => {
    let sum = 0;
    for (let key in ratings) {
      sum += Number(key) * Number(ratings[key]);
    }
    if (ratings !== undefined){

      console.log('Object.entries >>>', Object.entries(ratings))
    }
    return (sum / getTotal()).toFixed(1);
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
          return (<div>
            <span onClick={e=>console.log(e)} value={rating[0]} style={{textDecoration: 'underline'}}>{rating[0]} stars </span>
            <Bars count={rating[1]} total={getTotal()} />
            <br />
            </div>)
          })
        }
        <br />
        {characteristics && Object.entries(characteristics).map((characteristic) => {
          return (
            <div>{characteristic[0]}: {characteristic[1].value} </div>
          )
        })}
    </div>
  )
}


const barStyle = styled.div`
  display: flex;
  align-items: left;
`

export default Ratings;

