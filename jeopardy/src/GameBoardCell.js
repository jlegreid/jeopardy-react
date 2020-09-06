import React, {useState, useContext} from 'react';
import { ModalContext } from './ModalProvider';


function GameBoardCell(props) { 
    const onButtonClick = useContext(ModalContext);

    if (props.type === 'header') {
        return (
            <div className={`game-board-category-header-cell`}>
                <span id={props.category.id}>{props.category.title}</span>
            </div>
        )
    } else if (props.type === 'body') {
        return (
            <div>
                <div className={`game-board-category-body-cell`} clue={props.clue} onClick={onButtonClick}>
                    <span id={props.clue.id} category={props.clue.category_id}>${props.clue.value}</span>
                </div>
            </div>
        )
    } 
    
    return null;

};

export default GameBoardCell