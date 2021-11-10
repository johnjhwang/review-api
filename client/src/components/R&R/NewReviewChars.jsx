import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';


class NewReviewChars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      stars: null,
      recommend: null,
      characteristics: [],
    };

  }


  // handleInputChange(e) {
  //   const name = e.target.getAttribute('name');
  //   const value = e.target.value || e.target.getAttribute('value');

  //   console.log('e.target >>>>', e.target);
  //   this.setState({ [name]: value }, () => console.log(`${name} in state is now: `, this.state[name]));
  // }


  // submitReview() {
  //   console.log('submit button clicked, current state >>>>')
  // }

  // toggleImgWindow(e) {
  //   e.preventDefault(); // prevent reload of page
  //   this.setState({
  //     imgWindow: !this.state.imgWindow,
  //   }, () => console.log('submit IMG button clicked, current state >>>>', this.state.imgWindow));
  // }

  // toggleModal() {
  //   this.setState({
  //     show: !this.state.show,
  //     stars: null,
  //     imgWindow: false,
  //   })
  // }

  render () {

      return (
        <div>
          {this.props.characteristics}
       </div>)
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
  width: 70%;
  height: 80%;
  border-radius: 12px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  overflow-y: scroll;
`;





export default NewReviewChars;
