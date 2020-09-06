import React from 'react';
import GameBoardCell from './GameBoardCell';

function GameBoardColumn(props) {
    const sortedClues = props.cluesByCategory.clues.sort((a, b) => a.id > b.id ? 1 : -1);
    const boardCells = sortedClues.map((clue, index) => {
        if (index <= (props.clueCount - 1)) {
            return (
                <GameBoardCell 
                    key={clue.id}
                    clue={clue}
                    type="body"
                />
            )
        }
        return null;
    });

    return (
        <div id={props.id} className="game-board-category">
            <GameBoardCell 
                key={props.cluesByCategory.id} 
                category={props.cluesByCategory} 
                // handleClue={props.handleClue} 
                type="header"
            />
            {boardCells}
        </div>
    )
};

export default GameBoardColumn 
