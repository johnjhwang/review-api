import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import styled from 'styled-components';
import Reviews from './components/R&R/Reviews.jsx';
import Ratings from './components/R&R/Ratings.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render () {
    return (<div>
        <Ratings/>
        <Reviews/>
      </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));