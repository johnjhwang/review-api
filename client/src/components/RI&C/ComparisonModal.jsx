import ReactDOM from "react-dom";
import React from "react";
import $ from "jquery";
import axios from "axios";
import styled from "styled-components";
import ComparisonTable from "./ComparisonTable.jsx"

class ComparisonModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      features: {},
      cpName: this.props.cpInfo.name,
      rpName: this.props.rpInfo.name
    };
  }

  componentDidMount() {
    this.getProductFeatures()
  }

  getProductFeatures() {
    const currentProductFeatures = this.props.cpInfo.features;
    const relatedProductFeatures = this.props.rpInfo.features;
    let features = {}
    //get features value for current product
    currentProductFeatures.forEach((item) => {
      features[item.feature] = {
        'product1': item.value,
        'product2': null
      }
    })
    //get features value for related product
    relatedProductFeatures.forEach((item) => {
      features[item.feature] = {
        'product1': null,
        'product2': item.value
      }
    })
    //update state
    this.setState({
      features: features
    })

  }

  render() {
    console.log(this.state.features)
    return (
      <div>
        <Background>
          <ModalWrapper>
            <CloseButton>
              <button onClick={() => { this.props.closeModal(); }}> X </button>
            </CloseButton>
            <ComparisonTable cpName={this.state.cpName} rpName={this.state.rpName}/>
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
  width: 900px;
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
`;

const Table = styled.table`
  border: 1px solid black;
`;

const TR = styled.tr`
  border: 1px solid black;
`

const TD = styled.td`
  border: 1px solid black;
`

const TH = styled.th`
  border: 1px solid black;
`

export default ComparisonModal;
