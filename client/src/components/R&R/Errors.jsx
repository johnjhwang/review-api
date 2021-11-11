import React from 'react';
import styled from 'styled-components';



const Errors = ({ errors }) => {

  console.log('errors >>>>', errors);

    return (
    <Div>
      {errors}
    </Div>
    )
}

  const Div = styled.div`
    text-decoration: underline;
    color: red;
  `


export default Errors;

