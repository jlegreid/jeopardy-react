import React from 'react';

function LoadingIndicator(props) {
  return (
    <div className='loading-wrapper'>
      <div className='loading-icon'>
        <div className='circle'></div>
        <div className='circle'></div>
        <div className='circle'></div>
      </div>
      <div className='loading-text'>{props.loadingText}</div>
    </div>
  );
}

export default LoadingIndicator;
