import ReactDOM from "react-dom";
import React from "react";
import $ from "jquery";
import axios from "axios";
import styled from "styled-components";

class ComparisonTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <Table>
        <tbody>
          <TR>
            <TH>{this.props.cpName}</TH>
            <TH>Characteristics</TH>
            <TH>{this.props.rpName}</TH>
          </TR>
          <TR>
            <TD></TD>
            <TD></TD>
            <TD></TD>
          </TR>
        </tbody>
      </Table>
    );
  }
}

const Table = styled.table`
  border: 1px solid black;
`;

const TR = styled.tr`
  border: 1px solid black;
`;

const TD = styled.td`
  border: 1px solid black;
`;

const TH = styled.th`
  border: 1px solid black;
`;

export default ComparisonTable;
