import React from 'react';
import GameBoardColumn from './GameBoardColumn';
import LoadingIcon from './LoadingIcon';

function GameBoard(props) {

    if (props.loading) {
        return (
            <LoadingIcon loadingText = {"loading clues"}/>
        )
    } else {
        const boardColumn = props.cluesArray.map((cluesByCategory, index) => {
            return (
            <GameBoardColumn 
                key={index} 
                id={index} 
                cluesByCategory={cluesByCategory} 
                clueCount={props.clueCount}
                // handleClue={props.handleClue} 
            />
            )
        });
        return boardColumn;
    }
};

export default GameBoard