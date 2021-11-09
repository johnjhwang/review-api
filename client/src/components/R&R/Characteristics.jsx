import React from 'react';
import styled from 'styled-components';



const Characteristics = ({ entry }) => {

  console.log('entry >>>>', entry);

    return (
    <div>
      {entry[0]}: {entry[1].value}
      <BarContainer>
      <Bars>&nbsp;</Bars>
      <Bars>&nbsp;</Bars>
      <Bars>&nbsp;</Bars>
      </BarContainer>
      <br/>
    </div>
    )
} // labels, triangle

const BarContainer = styled.div`
  display: flex;
  gap: 5px;
`

const Bars = styled.div`
  color: lightgray;
  background-color: lightgray;
  width: 30%;
  height: 8px;
`;

export default Characteristics;

