import React from 'react';
import styled from 'styled-components';



const Characteristics = ({ entry }) => {

  console.log('entry >>>>', entry);

    return (
    <div>
      {entry[0]}: {entry[1].value}
    </div>
    )
}



export default Characteristics;

