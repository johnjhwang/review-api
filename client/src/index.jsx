import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import styled from 'styled-components';
import Overview from './components/R&R/Overview.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product_id: 39333
    }
  }

  render () {
    return (<div>
        <Overview product_id={this.state.product_id}/>
      </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));