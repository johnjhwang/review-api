import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import styled from 'styled-components';
import RPList from './components/RI&C/RPList.jsx';
import OutfitList from './components/RI&C/OutfitList.jsx'
import QA from './components/Q&A/Q&AIndex.jsx';
import Overview from './components/Overview/OverviewIndex.jsx';
import RROverview from './components/R&R/RROverview.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // 39333 to 40343 (39346) 40125 40212
      product_id: 40002
    }
    this.handleProductChange = this.handleProductChange.bind(this);
  }

  handleProductChange(id) {
    this.setState({ product_id: id })
  }
  render () {
    return (
    <div>
       {/* <Overview /> */}
        {/* <RPList productId={this.state.product_id} handleProductChange={this.handleProductChange}/>
        <OutfitList productId={this.state.product_id}/> */}
        {/* <QA /> */}
        {/* <RROverview product_id={this.state.product_id}/> */}
    </div>)
  }
}


export default App;


