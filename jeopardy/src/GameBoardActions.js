import React from 'react';

function GameBoardActions({ incrementCategoryUp, incrementCategoryDown, incrementClueCountUp, incrementClueCountDown, getNewGame, ...props}) {
    return (
        <div className="GameBoardActions">
            <button className="action-button increment-arrow arrow-down" onClick={incrementCategoryDown} disabled={props.categoryCount <= 1}>less categories</button>
            <button className="action-button increment-arrow arrow-up" onClick={incrementCategoryUp}>more categories</button>
            <button className="action-button" onClick={getNewGame}>New Game</button>
            <button className="action-button increment-arrow arrow-down" onClick={incrementClueCountDown} disabled={props.clueCount <= 1}>less clues</button>
            <button className="action-button increment-arrow arrow-up" onClick={incrementClueCountUp}>more clues</button>
        </div>
    )
};

export default GameBoardActions
