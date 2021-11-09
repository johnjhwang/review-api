import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import styled from 'styled-components';
import handler from '../Shared/reviewhandler.js';
import StarRating from './InteractiveStars.jsx';



class NewReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      stars: null,
      recommend: null,
      characteristics: null,
      summary: '',
      body: '',
      images: [],
      nickname: '',
      email: '',
      count: 60,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.submitReview = this.submitReview.bind(this);
    this.displayRating = this.displayRating.bind(this);
  }

  displayRating() {
    let { stars } = this.state;
    if (stars === 1) {

    }

  }

  handleInputChange(e) {
    const name = e.target.getAttribute('name');
    const value = e.target.getAttribute('value');
    console.log('e.target >>>>', e.target.getAttribute('name'));
    this.setState({ [name]: value }, () => console.log(`${name} in state is now: `, this.state[name]));
  }


  submitReview() {

  }

  toggleModal() {
    this.setState({
      show: !this.state.show,
      stars: null,
    })
  }

  // styled-components
  // 39333 to 40343
  render () {
    let ratingArr = ['Poor', 'Fair', 'Average', 'Good', 'Great']

    if (this.state.show) {
      return (
        <Background>
          <ModalWrapper>
            <ExitButton>
              <button onClick={this.toggleModal}>x</button>
            </ExitButton>
            <div style={{ justifyContent: 'center', textAlign: 'center' }}>
              <h2>Write Your Review</h2>
              <h3>About the {this.props.name}</h3>
            </div>
            <form>
              <label>
                <h4>Overall Rating</h4>
                <div style={{display: 'flex'}}>
                  <StarRating handleInputChange={this.handleInputChange}/>&nbsp;{ratingArr[this.state.stars - 1]}
                </div>
              </label>
              <label>
                <h4>Do you recommend this product?</h4>
                <label>
                  <input
                    name="recommend"
                    type="radio"
                    value={true}
                    defaultChecked
                    onChange={this.handleInputChange}/>
                  Yes
                </label>
                <label>
                  <input
                    name="recommend"
                    type="radio"
                    value={false}
                    onChange={this.handleInputChange}/>
                  No
                </label>
              </label>

              <label>
                <h4>Number of guests:</h4>
                <input
                  name="numberOfGuests"
                  type="number"
                  value={this.state.numberOfGuests}
                  onChange={this.handleInputChange} />
              </label>





            </form>

            <br />
            <div style={{display: 'inline'}}><Button onClick={this.toggleModal}>Close</Button>&nbsp; &nbsp; &nbsp;<Button style={{cursor: 'pointer'}} onClick={this.submitReview}>Submit Review</Button></div>
          </ModalWrapper>
        </Background>
        );
    } else {
        return (<div>
          <button style={{cursor: 'pointer'}} onClick={this.toggleModal}>Add a Review</button>
          </div>)
    }
  }
}

const Button = styled.button`
  display: inline-block;
  border-radius: 3px;
  width: 10rem;
  color: black;
  border: 1px solid black;
`

const Background = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  width: 70%;
  height: 70%;
  border-radius: 12px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  flex-direction: column;
  padding: 25px;
`;

const ExitButton = styled.div`
display: flex;
justify-content: flex-end;
cursor: pointer;
`




export default NewReview;
