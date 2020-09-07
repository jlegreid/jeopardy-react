import React from 'react';

function GameBoardActions({ incrementCategoryUp, incrementCategoryDown, incrementClueUp, incrementClueDown, startNewGame, onClose, ...props}) {
    return (
        <div className="GameBoardActions">
            <div className="category-config">
                <span>Categories</span>
                <button className="action-button increment-arrow arrow-down" onClick={incrementCategoryDown} disabled={props.categoryCount <= 1}>-</button>
                <span>{props.categoryCount}</span>
                <button className="action-button increment-arrow arrow-up" onClick={incrementCategoryUp}>+</button>
            </div>
            <div className="clue-config">
                <span>Clues</span>
                <button className="action-button increment-arrow arrow-down" onClick={incrementClueDown} disabled={props.clueCount <= 1}>-</button>
                <span>{props.clueCount}</span>
                <button className="action-button increment-arrow arrow-up" onClick={incrementClueUp}>+</button>
            </div>
            <br />
            <button className="action-button" onClick={startNewGame}>Go!</button>
            <button className="action-button secondary" onClick={onClose}>Nah</button>
        </div>
    )
};

export default GameBoardActions
