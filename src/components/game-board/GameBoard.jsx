import React from 'react';
import GameBoardColumn from './GameBoardColumn';
import LoadingIcon from '../LoadingIcon';

function GameBoard(props) {
  if (props.loading) {
    return (
      <div className='game-board'>
        <LoadingIcon loadingText={'loading clues'} />
      </div>
    );
  } else if (props.cluesArray.length) {
    const boardColumn = props.cluesArray.map((cluesByCategory, index) => {
      return (
        <GameBoardColumn
          key={index}
          cluesByCategory={cluesByCategory}
          clueCount={props.clueCount}
        />
      );
    });
    return (
      <div className='game-board-scroll'>
        <div className='game-board'>{boardColumn}</div>
      </div>
    );
  } else {
    return <span className='new-game-prompt'>Let's start a new game!</span>;
  }
}

export default GameBoard;
