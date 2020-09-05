import React from 'react';
import GameBoardColumn from './GameBoardColumn';

function GameBoard(props) {
    const boardColumn = props.cluesArray.map((cluesByCategory, index) => {
        return <GameBoardColumn key={index} id={index} cluesByCategory={cluesByCategory}/>;
    });
    return boardColumn;
};

export default GameBoard