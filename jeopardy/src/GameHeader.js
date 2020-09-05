import React from 'react';
import logo from './jeopardy-logo.png';

function GameHeader() {
    return (
        <div className="header">
            <div className="header-outer-shape">
                <div className="header-inner-shape">
                    <img src={logo} className="header-img" alt="jeopardy logo"/>
                </div>
            </div>
        </div>
    )
};

export default GameHeader