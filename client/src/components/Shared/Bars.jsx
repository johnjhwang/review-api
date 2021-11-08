import React from 'react';

const Bars = ({count, total}) => {
  const percentage = count / total;


  const backgroundStyle = {
    width: '14%',
    height: '1.2%',
    backgroundColor: '#cccccc',
    marginLeft: '5px',
    position: 'absolute'
  }

  const filledStyle = {
    backgroundColor: '#268246',
    height: '1.2%',
    width: `${14 * percentage}%`,
    position: 'absolute'

  }

  return (
    <div>
      <span style={backgroundStyle}></span>
      <span style={filledStyle}></span>
    </div>


  )
}



export default Bars;