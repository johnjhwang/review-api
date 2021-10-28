import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import axios from "axios";
import RPEntry from "./RPEntry.jsx"

class RPList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <p>This is RPList</p>
        <RPEntry />
      </div>
    );
  }
}


export default RPList;
