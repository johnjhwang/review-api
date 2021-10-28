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

  // stars, loading more questions/reviews, adding a question/review,
  // tailwind css https://tailwindcss.com/
  // how to handle custom css? global? sass? other stuff? look it up on slides

  render () {
    return (<div>
        Placeholder
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));