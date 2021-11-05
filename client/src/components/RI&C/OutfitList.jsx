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
      outfits: [39340],
      leftCount: 0,
      showLeft: false,
      showRight: true
    };
    this.myRef = React.createRef();
    this.handlePlusButtonClick = this.handlePlusButtonClick.bind(this);
    this.deleteOutfit = this.deleteOutfit.bind(this);
    this.moveToPrev = this.moveToPrev.bind(this);
    this.moveToNext = this.moveToNext.bind(this);
    this.showArrow = this.showArrow.bind(this);
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

  moveToNext() {
    this.setState({leftCount: this.state.leftCount + 1}, this.showArrow)
  }

  moveToPrev() {
    this.setState({leftCount: this.state.leftCount - 1}, this.showArrow)
  }

  showArrow() {
    //right arrow
    if (this.myRef.current) {
     let containerWidth = this.myRef.current.offsetWidth;
     let cardWidth = (this.state.outfits.length - this.state.leftCount) * 200
     if (containerWidth > cardWidth) {
       this.setState({ showRight: false })
     } else if (containerWidth <= cardWidth) {
      this.setState({ showRight: true })
     }
    }
    //left arrow
    if (this.state.leftCount > 0) {
      this.setState({ showLeft: true})
    } else if (this.state.leftCount < 1) {
      this.setState({ showLeft: false})
    }
  }

  render() {
    return(
      <div>
        <Title>YOUR OUTFIT</Title>
        <ListContainer>
        <ButtonContainer>{this.state.showLeft && <LeftArrow onClick={this.moveToPrev}>˱</LeftArrow>}</ButtonContainer>
          <Card><PlusButton onClick={this.handlePlusButtonClick}>+</PlusButton></Card>
          <CarouserContainerInner ref={this.myRef}>
            {this.state.outfits.slice(this.state.leftCount).map((id) => {
              return <RPEntry relatedProductId={id} key={id} outfit={true} deleteOutfit={this.deleteOutfit}/>
            })}
        </CarouserContainerInner>
        <ButtonContainer>{this.state.showRight && <RightArrow onClick={this.moveToNext}>˲</RightArrow>}</ButtonContainer>
        </ListContainer>
      </div>

    )
  }
}

export default OutfitList;

const Title = styled.h3`
  color: grey;
  margin-left: 50px;
`

const ListContainer = styled.div`
  //margin: auto;
  height: 320px;
  width: 71%;
  display: flex;
  align-items: center;
`


const CarouserContainerInner = styled.div`
  //overflow-x: scroll;
  overflow: hidden;
  scroll-snap-type: x mandatory;
  -ms-overflow-style: none;
  scrollbar-width: none;
  display: flex;
  width: 71%;
`

const Card = styled.div`
  min-width: 180px;
  height: 300px;
  box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 10%), 0 0 0 1px rgb(10 10 10 / 2%);
  border-radius: 0.25rem;
  margin: 8px;
  border: 1px solid grey;
`;

const ButtonContainer = styled.div`
  width: 40px;
  height: 100px;
`

const PlusButton = styled.button`
  margin-top: 115px;
  margin-left: 65px;
  font-size: 70px;
  cursor: pointer;
  background-color: transparent;
  border: none;
`

const LeftArrow = styled.button`
  left:0;
  margin-top: -70px;
  font-size: 90px;
  text-align: center;
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: grey;
  &:hover{
    color: black;
  }
`

const RightArrow = styled(LeftArrow)`
  right:0;
`