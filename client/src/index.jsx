import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import RPList from './components/RI&C/RPList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product_id: 39334
    }

  }

  render () {
    return (
    <div>
        <RPList productId={this.state.product_id}/>
        {/* <Overview product_id={this.state.product_id}/> */}
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));