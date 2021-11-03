import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import styled from 'styled-components';
import Overview from './components/R&R/Overview.jsx';
import RPList from './components/RI&C/RPList.jsx';
import OutfitList from './components/RI&C/OutfitList.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product_id: 39335
    }
  }

  render () {

    return (
    <div>
        <RPList productId={this.state.product_id}/>
        <OutfitList productId={this.state.product_id}/>
        {/* <Overview product_id={this.state.product_id}/> */}
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));