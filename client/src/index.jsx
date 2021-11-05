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
    this.handleProductChange = this.handleProductChange.bind(this);
  }


  handleProductChange(id) {
    //console.log('currentid', id)
    this.setState({ product_id: id })
  }

  render () {
    //console.log(this.state.product_id);

    return (
    <div>
        <RPList productId={this.state.product_id} handleProductChange={this.handleProductChange}/>
        <OutfitList productId={this.state.product_id}/>
        {/* <Overview product_id={this.state.product_id}/> */}
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));