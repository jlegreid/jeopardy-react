import React from 'react';

function GameBoardCell(props) { 
    if (props.type === 'header') {
        return (
            <div className={`game-board-category-header-cell`}>
                <span id={props.category.id}>{props.category.title}</span>
            </div>
        )
    } else if (props.type === 'body') {
        return (
            <div className={`game-board-category-body-cell`}>
                <span id={props.clue.id} category={props.clue.category_id}>${props.clue.value}</span>
            </div>
        )
    } 
    return null;

};

export default GameBoardCell