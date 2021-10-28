// Overview

import React from "react";

import ReactDOM from "react-dom";

import axios from "axios";


class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: null,
      productSelected: 0
    }
  }

  render () {
    return (
      <div>
        <h1>{this.state.productList[this.state.productSelected].name}</h1>
      </div>
    )
  }
}


ReactDOM.render(<Overview />, document.getElementById('app'));
