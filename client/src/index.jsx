import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import QA from './components/Q&A/Q&AIndex.jsx';
import styled from 'styled-components';
import Overview from './components/Overview/OverviewIndex.jsx';
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
    this.setState({ product_id: id })
  }
  render () {
    return (<div>
        <QA />
        {/* <RPList productId={this.state.product_id}/> */}
        <Overview />
        </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

