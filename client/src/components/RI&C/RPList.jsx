import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import axios from "axios";
import RPEntry from "./RPEntry.jsx"

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
        {this.state.relatedProductId.map((id) => {
          return <RPEntry relatedProductId={id} key={id}/>
        })}
      </div>
    );
  }
}


export default RPList;
