import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import axios from "axios";
import styled from "styled-components";
import RPEntry from "./RPEntry.jsx";


class OutfitList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      outfits: [39340]
    };

    this.handlePlusButtonClick = this.handlePlusButtonClick.bind(this);
    this.deleteOutfit = this.deleteOutfit.bind(this);
  }

  handlePlusButtonClick() {
    let copy = this.state.outfits;
    if (!copy.includes(this.props.productId)) {
      copy.push(this.props.productId);
    }
    this.setState({ outfits: copy });
  }

  deleteOutfit(id) {
    let copy = this.state.outfits;
    let index = copy.indexOf(id);
    copy.splice(index, 1)
    this.setState({ outfits: copy })
  }

  render() {
    return(
      <div>
        <Title>YOUR OUTFIT</Title>
        <ListContainer>
          <Card><PlusButton onClick={this.handlePlusButtonClick}>+</PlusButton></Card>
          <CarouserContainerInner>
            {this.state.outfits.map((id) => {
              return <RPEntry relatedProductId={id} key={id} outfit={true} deleteOutfit={this.deleteOutfit}/>
            })}
        </CarouserContainerInner>
        </ListContainer>
      </div>

    )
  }
}

export default OutfitList;

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

const Card = styled.div`
  width: 180px;
  height: 300px;
  box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 10%), 0 0 0 1px rgb(10 10 10 / 2%);
  border-radius: 0.25rem;
  margin: 8px;
  border: 1px solid grey;
`;

const PlusButton = styled.button`
  margin-top: 120px;
  margin-left: 65px;
  font-size: 50px;
`