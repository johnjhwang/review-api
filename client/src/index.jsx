import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
// import Subcomponent from './components/Subcomponent.jsx';
import QA from './components/Q&A/Q&AIndex.jsx';
import styled from 'styled-components';
import Overview from './components/R&R/Overview.jsx';
import RPList from './components/RI&C/RPList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product_id: 39334
    }
  }
  render () {
    return (<div>
        <QA />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//     }
//   }

//   render () {
//     return (<div>
//         Placeholder
//     </div>)
//   }
// }

// ReactDOM.render(<App />, document.getElementById('app'));

