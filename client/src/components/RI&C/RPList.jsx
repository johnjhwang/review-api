import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import axios from "axios";
import RPEntry from "./RPEntry.jsx"
import styled from 'styled-components'

class RPList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedProductId: [],
      currentProductInfo: {}
    };

  }

  componentDidMount() {
    this.getRelatedProductId(),
    this.getCurrentProductInfo()
  }

  getRelatedProductId() {
    let id = this.props.productId;
    axios.get(`products/${id}/related`)
      .then((results) => {
        //console.log('Results in getProductId: ', results.data)
        this.setState({
          relatedProductId: results.data
        })
      })
      .catch((err) => {
        console.log('Error in getProductInfo')
      })
  }

  getCurrentProductInfo() {
    const id = this.props.productId;
    axios
      .get(`products/${id}`)
      .then((results) => {
        //console.log('Results in getProductInfo: ', results.data)
        this.setState({
          currentProductInfo: results.data,
        });
      })
      .catch((err) => {
        console.log("Error in currentProductInfo");
      });
  }


  render() {
    //console.log(this.state.currentProductInfo)
    return (
      <div>
        <Title>RELATED PRODUCTS</Title>
        <ListContainer>
          <CarouserContainerInner>
        {this.state.relatedProductId.map((id) => {
          return <RPEntry relatedProductId={id} key={id} productInfo={this.state.currentProductInfo}/>
        })}
        </CarouserContainerInner>
        </ListContainer>
      </div>
    );
  }
}

const Title = styled.h3`
  color: grey;
`

const ListContainer = styled.div`
  //margin: auto;
  height: 300px;
  width: 70%;
  display: flex;
  align-items: center;
`


const CarouserContainerInner = styled.div`
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  -ms-overflow-style: none;
  scrollbar-width: none;
  display: flex;
`


export default RPList;
