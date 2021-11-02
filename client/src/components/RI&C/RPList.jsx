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
      relatedProductId: []
    };

  }

  componentDidMount() {
    this.getRelatedProductId();
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


  render() {
    //console.log(this.state.relatedProductId)
    return (
      <div>
        <ListContainer>
          <CarouserContainerInner>
        {this.state.relatedProductId.map((id) => {
          return <RPEntry relatedProductId={id} key={id}/>
        })}
        </CarouserContainerInner>
        </ListContainer>
      </div>
    );
  }
}

const ListContainer = styled.div`
  margin: auto;
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
