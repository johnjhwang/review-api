import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import styled from 'styled-components';
import handler from '../../helpers/reviewhandler.js';



class NewReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    }
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({
      show: !this.state.show
    })
  }

  // stars, loading more questions/reviews, adding a question/review,
  // styled-components
  // All reviews will be saved per product.  Specific styles will not be accounted for within the review module.
  // 39333 to 40343
  render () {
    if (this.state.show) {
      return (<div>
        Submission form line 1
        <br />
        Submission form line 2
        <br />
        <button onClick={this.toggleModal}>Close Submission Form</button>
        </div>);
    } else {
        return (<div>
        <button onClick={this.toggleModal}>Add a Review</button>
        </div>)
    }

  }
}

const FlexContainer = styled.div`
  display: flex;
  padding: 10px;
  gap: 100px;
  `;

export default NewReview;
