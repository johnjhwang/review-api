import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import styled from 'styled-components';
import handler from '../Shared/reviewhandler.js';
import StarRating from './InteractiveStars.jsx';
import NewReviewChars from './NewReviewChars.jsx';
import Errors from './Errors.jsx';

class NewReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      stars: null,
      recommend: true,
      characteristics: {},
      summary: '',
      body: '',
      images: [],
      nickname: '',
      email: '',
      count: `Minimum required characters left: 50`,
      imgWindow: false,
      submitted: false,
      errors: {},
      showError: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleImgWindow = this.toggleImgWindow.bind(this);
    this.submitReview = this.submitReview.bind(this);
    this.characterCounter = this.characterCounter.bind(this);
    this.processCharSelection = this.processCharSelection.bind(this);
  }

  characterCounter(e) {
    let charsLeft = 50 - e.target.value.length;
    if (charsLeft > 0) {
       this.setState({ count: `Minimum required characters left: ${charsLeft}` });
    } else {
      this.setState({ count: 'Minimum reached' });
    }
  }

  handleInputChange(e, callback = () => {}) {
    const name = e.target.getAttribute('name');
    const value = e.target.value || e.target.getAttribute('value');

    console.log('e.target >>>>', e.target);
    this.setState({ [name]: value }, () => console.log(`${name} in state is now: `, this.state[name]), callback(e));
  }

  processCharSelection(name, value) {
    console.log('this.props.characteristics >>>', this.props.characteristics);

    const charId = this.props.characteristics[name].id
    const update = {...this.state.characteristics, [charId]: Number(value) };
    this.setState({characteristics: update}, () => console.log('state characteristics Obj >>>', this.state.characteristics));

  }

  submitReview() {
    let errors = this.dataValidator();
    console.log('errors >>>', errors);
    if (Object.keys(errors).length > 0) {
      this.setState({ errors, showError: true });
    } else if (!this.state.submitted) {
      const body = this.reviewConstructor();
      handler.post(body, () => {
        this.setState({
          // show: false,
          stars: null,
          recommend: true,
          characteristics: {},
          summary: '',
          body: '',
          images: [],
          nickname: '',
          email: '',
          count: `Minimum required characters left: 50`,
          submitted: true,
        });
      });
    }
  }


  reviewConstructor(data) {
    const reqBody = {
      product_id: this.props.pid,
      rating: Number(this.state.stars),
      summary: this.state.summary,
      body: this.state.body,
      recommend: Boolean(this.state.recommend),
      name: this.state.nickname,
      email: this.state.email,
      characteristics: this.state.characteristics
    }
    console.log('reqbody >>>>', reqBody);
    return reqBody;
  }

  dataValidator() {
    console.log('current state >>>>', this.state);
    let { stars, recommend, characteristics, summary, body, nickname, email, images } = this.state;
    let errors = {};

    if (stars === null) { errors.rating = ('Please select Overall Rating'); }
    if (Object.keys(characteristics).length === 0) { errors.characteristics = ('Please rate product characteristics'); }
    if (nickname.length === 0) { errors.nickname = ('Please provide your nickname'); }
    if (email.length === 0) { errors.email = ('Please provide your email'); } // email format, images
    if (body.length < 50) { errors.body = ('Please make sure the Review Body is at least 50 characters'); }

    return errors;
  }

  toggleImgWindow(e) {
    e.preventDefault(); // prevent reload of page
    this.setState({
      imgWindow: !this.state.imgWindow,
    }, () => console.log('submit IMG button clicked, current state >>>>', this.state.imgWindow));
  }

  toggleModal() {
    this.setState({
      show: !this.state.show,
      imgWindow: false,
      errors: {},
      showError: false
    })
  }

  // 39333 to 40343
  render () {
    let ratingArr = ['Poor', 'Fair', 'Average', 'Good', 'Great'];
    let charNames = this.props.characteristics && Object.keys(this.props.characteristics);

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
                <h4>Overall Rating (required)</h4>
                <div style={{display: 'flex'}}>
                  <StarRating handleInputChange={this.handleInputChange}/>&nbsp;{ratingArr[this.state.stars - 1]}
                </div>
              </label>
              <label>
                <h4>Do you recommend this product? (required)</h4>
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
                <h4>Characteristics (required)</h4>
                {charNames.map((char, key) =>
                <NewReviewChars key={key} characteristics={char} processCharSelection={this.processCharSelection}/>)}
              </label>
              <label>
                <h4>Nickname (required)</h4>
                <input
                  style={{width: '50%'}}
                  type="text"
                  value={this.state.nickname}
                  name="nickname"
                  onChange={this.handleInputChange}
                  placeholder="Example: jackson11!"
                  maxLength="60"
                  />
                  <br/><small style={{fontStyle: 'italic'}}>{'For privacy reasons, do not use your full name or email address'}</small>
              </label>
              <label>
                <h4>Email (required)</h4>
                <input
                  style={{width: '50%'}}
                  type="text"
                  value={this.state.email}
                  name="email"
                  onChange={this.handleInputChange}
                  placeholder="Example: jackson11@email.com"
                  maxLength="60"
                  />
                  <br/><small style={{fontStyle: 'italic'}}>{'For authetication reasons, you will not be emailed'}</small>
              </label>

              <label>
                <h4>Review Summary</h4>
                <input
                  style={{width: '50%'}}
                  type="text"
                  value={this.state.summary}
                  name="summary"
                  onChange={this.handleInputChange}
                  placeholder="Example: Best purchase ever!"
                  maxLength="60"
                  />
              </label>
              <label>
                <h4>Review Body (required)</h4>
                <textarea
                style={{width: '95%'}}
                rows="6"
                name="body"
                placeholder="Why did you like the product or not?"
                value={this.state.body}
                maxLength="1000"
                onChange={e => this.handleInputChange(e, this.characterCounter)}/>
              </label>
              <br/><small>{this.state.count}</small>
              <br/>
              <label>
                <br/><Button onClick={this.toggleImgWindow}>Upload Photos</Button>
              </label>
              <br/>
              {this.state.showError && <div style={{color: 'red'}}> SUBMISSION ERROR. Please fix the below issues </div>}
              {this.state.showError && (Object.values(this.state.errors).map((errors, key) => (
                <Errors errors={errors} key={key} />
              )))}
            </form>
            <br />
            <div style={{display: 'inline'}}><Button onClick={this.toggleModal}>Cancel</Button>&nbsp; &nbsp; &nbsp;<Button onClick={this.submitReview}>Submit Review</Button></div>
            {this.state.submitted && <div>Review successfully submitted, thank you!</div>}
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
  cursor: pointer;
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
  width: 75%;
  height: 90%;
  border-radius: 12px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  overflow-y: scroll;
`;

// max-height: 70vh;

const ExitButton = styled.div`
display: flex;
justify-content: flex-end;
cursor: pointer;
`




export default NewReview;
