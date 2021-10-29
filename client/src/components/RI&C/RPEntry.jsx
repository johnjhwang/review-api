import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import axios from "axios";

class RPEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productInfo: {}
    };

  }

  componentDidMount() {
    this.getProductInfo()

  }

  getProductInfo() {
    const id = this.props.relatedProductId;
    axios.get(`products/${id}`)
      .then((results) => {
        //console.log('🛑Results in getProductInfo: ', results.data)
        this.setState({
          productInfo: results.data
        })
      })
      .catch((err) => {
        console.log('Error in getProductInfo')
      })
  }

  render() {
    const {category, name, default_price} = this.state.productInfo
    return (
      <div>

        Category: {category}
        Name: {name}
        Price: {default_price}

      </div>
    );
  }
}




export default RPEntry;