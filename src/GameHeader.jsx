import React from 'react';
import Shapes from './Shapes';
import logo from './jeopardy-logo.png';

function GameHeader() {
  return (
    <div className='header'>
      <Shapes>
        <img src={logo} className='header-img' alt='jeopardy logo' />
      </Shapes>
    </div>
  );
}

export default GameHeader;
