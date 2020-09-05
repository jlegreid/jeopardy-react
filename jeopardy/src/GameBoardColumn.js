import React from 'react';
import GameBoardCell from './GameBoardCell';

function GameBoardColumn(props) {
    const numberOfClues = 10;
    const sortedClues = props.cluesByCategory.clues.sort((a, b) => a.id > b.id ? 1 : -1);
    const boardCells = sortedClues.map((clue, index) => {
        if (index <= (numberOfClues - 1)) {
            return <GameBoardCell clue={clue} key={clue.id} type="body"/>;
        }
        return null;
    });

    return (
        <div id={props.id} className="game-board-category">
            <GameBoardCell category={props.cluesByCategory} key={props.cluesByCategory.id} type="header"/>
            {boardCells}
        </div>
    )
};

export default GameBoardColumn 
