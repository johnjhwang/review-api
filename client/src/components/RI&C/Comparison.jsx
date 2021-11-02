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
        <Background>
          <ModalWrapper>
            <CloseButton>
              <button onClick={() => {this.props.closeModal()}}> X </button>
            </CloseButton>
          </ModalWrapper>
        </Background>
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
  width: 800px;
  height: 400px;
  border-radius: 12px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  flex-direction: column;
  padding: 25px;
`;


const CloseButton = styled.div`
  display: flex;
  justify-content: flex-end;
`

export default Comparison;

