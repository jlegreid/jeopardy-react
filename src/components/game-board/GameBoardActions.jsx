import React from 'react';
import GameConfigSection from './modals/GameConfigSection';

function GameBoardActions({
  incrementCategoryUp,
  incrementCategoryDown,
  incrementClueUp,
  incrementClueDown,
  startNewGame,
  onClose,
  ...props
}) {
  return (
    <>
      <div className='game-config'>
        <div className='game-config-title'>
          {props.firstTime ? (
            <>
              <span className='headline'>Welcome to Jeopardy!</span>
              <br />
              Configure your game to get started.
            </>
          ) : (
            <span className='headline'>Let's play again!</span>
          )}
        </div>
        <div className='game-config-row'>
          <GameConfigSection
            sectionHeader={'Categories'}
            incrementDown={incrementCategoryDown}
            incrementUp={incrementCategoryUp}
            itemCount={props.categoryCount}
          />
          <GameConfigSection
            sectionHeader={'Clues'}
            incrementDown={incrementClueDown}
            incrementUp={incrementClueUp}
            itemCount={props.clueCount}
          />
        </div>
      </div>
      <button className='action-button large' onClick={startNewGame}>
        New Game
      </button>
      <button className='action-button tertiary' onClick={onClose}>
        Cancel
      </button>
    </>
  );
}

export default GameBoardActions;
