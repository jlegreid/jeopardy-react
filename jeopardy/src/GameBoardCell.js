import React, {useState} from 'react';
import Modal from './Modal';

function GameBoardCell({ onClose, ...props }) { 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showAnswer, setShowAnswer] = useState(null);
    const [clueViewed, setClueViewed] = useState(false);
    const handleClueClick = () => {
        setIsModalOpen(true)
        setClueViewed(true);
    }
    const handleOnClose = () => {
        setIsModalOpen(false)
        // setShowAnswer(null)
    }

    const question = () => {
        return props.clue.question.replace( /(<([^>]+)>)/ig, '').replace(/[\\]/g, '');;
    }
    const answer = () => {
        return props.clue.answer.replace( /(<([^>]+)>)/ig, '').replace(/[\\]/g, '');;
    }
    
    if (props.type === 'header') {
        return (
            <div className="game-board-category-header-cell">
                <div className="game-board-category-header-cell-button" id={props.category.id}><span>{props.category.title}</span></div>
            </div>
        )
    } else if (props.type === 'body') {
        return (
            <div className='game-board-category-body-cell'>
                <button 
                    id={props.clue.id} 
                    className="game-board-category-body-cell-button"
                    category={props.clue.category_id} 
                    onClick={handleClueClick}>
                    {clueViewed ? '' : <span>${props.clue.value}</span>}
                </button>
                {isModalOpen && (
                    <Modal classes="clue-modal">
                        <div className={"modal-body " + showAnswer}>
                            <div className="clue-card answer-side">
                                <span className="clue-text">{answer()}</span>
                                <div className="clue-card-actions">
                                    <button className="action-button" onClick={() => setShowAnswer('show-question')}>Show Question</button>
                                    <button className="action-button secondary" onClick={handleOnClose}>Done</button>
                                </div>
                            </div>
                            <div className="clue-card question-side">
                                <span className="clue-text">{question()}</span>
                                <div className="clue-card-actions">
                                    <button className="action-button" onClick={() => setShowAnswer('show-answer')}>Show Answer</button>
                                    <button className="action-button secondary" onClick={handleOnClose}>Done</button>
                                </div>
                            </div>
                        </div>
                    </Modal>
                )}
            </div>
        )       
    } 
    return null;
};

export default GameBoardCell