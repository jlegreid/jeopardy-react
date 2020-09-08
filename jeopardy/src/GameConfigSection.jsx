import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'


function GameConfigSection({ incrementDown, incrementUp, ...props }) {
  return (
    <div className='game-config-section'>
      <div className='game-config-section-header'>{props.sectionHeader}</div>
      <div className='game-config-actions'>
        <button
          className='action-button increment-arrow'
          onClick={incrementDown}
          disabled={props.itemCount <= 1}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <span className='game-config-actions-number'>{props.itemCount}</span>
        <button
          className='action-button increment-arrow'
          onClick={incrementUp}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  )
}

export default GameConfigSection;