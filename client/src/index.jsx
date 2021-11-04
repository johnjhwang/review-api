import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import Overview from './components/Overview/OverviewIndex.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }

  }

  render () {
    return (<div>
        <Overview />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

