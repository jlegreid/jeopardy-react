import React from 'react';
import GameBoardColumn from './GameBoardColumn';
import LoadingIcon from './LoadingIcon';

function GameBoard(props) {

    if (props.loading) {
        return (
            <div className="game-board">
                <LoadingIcon loadingText = {"loading clues"}/>
            </div>
        )
    } else {
        const boardColumn = props.cluesArray.map((cluesByCategory, index) => {
            return (
            <GameBoardColumn 
                key={index} 
                id={index} 
                cluesByCategory={cluesByCategory} 
                clueCount={props.clueCount}
            />
            )
        });
        return (
            <div className="game-board">
                {boardColumn}
            </div>
        )
    }
};

export default GameBoard