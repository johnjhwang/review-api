import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import Subcomponent from './components/Subcomponent.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }

  }

  render () {
    return (<div>
        <Subcomponent/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

// Kyle here