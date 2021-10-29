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
        <RPList productId={39333}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));