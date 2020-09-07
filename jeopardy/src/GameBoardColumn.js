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
        <div category={props.cluesByCategory.id} className="game-board-category">
            <div className="game-board-category-header-cell">
                <div className="game-board-category-header-cell-button">
                    <span>{props.cluesByCategory.title}</span>
                </div>
            </div>
            {boardCells}
        </div>
    )
};

export default GameBoardColumn 
