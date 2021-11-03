import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import axios from "axios";
import styled from "styled-components";
import ComparisonModal from "./ComparisonModal.jsx";

class RPEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productInfo: {},
      productStyle: {},
      productRatings: {},
      openModal: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {
    this.getProductInfo(),
    this.getProductStyle(),
    this.getProductRating();
  }

  //////////////////////////////////////////////////////////////////////////////////
  getProductInfo() {
    const id = this.props.relatedProductId;
    axios
      .get(`products/${id}`)
      .then((results) => {
        //console.log('Results in getProductInfo: ', results.data)
        this.setState({
          productInfo: results.data,
        });
      })
      .catch((err) => {
        console.log("Error in getProductInfo");
      });
  }

  getProductStyle() {
    const id = this.props.relatedProductId;
    axios
      .get(`products/${id}/styles`)
      .then((results) => {
        //console.log('Results in getProductInfo: ', results.data)
        this.setState({
          productStyle: results.data,
        });
      })
      .catch((err) => {
        console.log("Error in getProductInfo");
      });
  }

  getProductRating() {
    const id = this.props.relatedProductId;
    axios
      .get(`reviews/meta/${id}`)
      .then((results) => {
        //console.log('Results in productRatings: ', results.data.ratings)
        this.setState({
          productRatings: results.data,
        });
      })
      .catch((err) => {
        console.log("Error in getProductInfo");
      });
  }

  //////////////////////////////////////////////////////////////////////////////////

  toggleModal() {
    this.setState({
      openModal: !this.state.openModal,
    });
  }

  //////////////////////////////////////////////////////////////////////////////////

  render() {
   //console.log(this.props.productInfo)
    const { category, name, default_price } = this.state.productInfo;
    const results = this.state.productStyle.results;
    const salePrice = results ? results.sale_price : "null";
    const ratings = this.state.productRatings.ratings;
    let avgRating = 0;
    let length = 0;
    if (ratings) {
      let sum = 0;
      for (let key in ratings) {
        sum += key * ratings[key];
        length += Number(ratings[key]);
      }
      avgRating = sum / length;
    }

    return (
      <div>
        {/* Category: {category}
        Name: {name}
        Price: {salePrice ? 'onsale'+salePrice : default_price}
        Image: {results ? <img src={this.state.productStyle.results[0].photos[0].thumbnail_url}></img> : 'null'}
        Rating: {avgRating}
        <button onClick={this.toggleModal}>Open Modal</button>
        {this.state.openModal && <Comparison />} */}
        {this.state.openModal &&
        <ComparisonModal closeModal={this.toggleModal} rpInfo={this.state.productInfo} cpInfo={this.props.productInfo}/>
        }
        <Card>
          <Image url={results ? this.state.productStyle.results[0].photos[0].thumbnail_url : 'null'}>
          <Button><button onClick={this.toggleModal}>★</button></Button>
          </Image>
          <Content>
            <p>
              {category} <br></br>
              {name} <br></br>
              {salePrice ? "onsale" + salePrice : "$" + default_price} <br></br>
              {"Rating: " + avgRating}
            </p>
          </Content>
        </Card>
      </div>
    );
  }
}

const Card = styled.div`
  width: 200px;
  height: 300px;
  box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 10%), 0 0 0 1px rgb(10 10 10 / 2%);
  border-radius: 0.25rem;
  margin: 8px;
  border: 1px solid grey;
`;

const Content = styled.div`
  width: 200px;
  height: 80px;
  padding: 5px;
`;

const Button = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Image = styled.div`
  width: 100%;
  height: 200px;
  // border: solid;
  background-image: url(${props => props.url || " "});
  background-repeat: no-repeat;
  background-size: 100% 100%;
`;

export default RPEntry;
