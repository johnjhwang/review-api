import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import RPList from './components/RI&C/RPList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }

  }

  render () {
    return (
    <div>
        <RPList productId={this.props.productId}/>
    </div>)
  }
}

ReactDOM.render(<App productId={39334}/>, document.getElementById('app'));