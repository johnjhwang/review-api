import ReactDOM from "react-dom";
import React from "react";
import $ from "jquery";
import axios from "axios";
import styled from 'styled-components';

class Comparison extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productInfo: {}
    };
  }


  render() {
    return (
      <div>
        {/* <Background>
          <ModalWrapper> */}
          <button onClick={() => {this.props.closeModal()}}> X </button>
          {/* </ModalWrapper>
        </Background> */}
      </div>
    );
  }

}

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(200, 200, 200);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  width: 1000px;
  height: 500px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  z-index: 10;
  border-radius: 10px;
`;

export default Comparison;

