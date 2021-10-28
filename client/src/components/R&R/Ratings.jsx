import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import styled from 'styled-components';
import helpers from '../../helpers/reviewhandler.js';

class Ratings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }

  }

  // stars, loading more questions/reviews, adding a question/review,
  // styled-components
  // All reviews will be saved per product.  Specific styles will not be accounted for within the review module.

  render () {
    return (<div>
        Ratings
    </div>)
  }
}


export default Ratings;

