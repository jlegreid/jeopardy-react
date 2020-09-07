import React, {useState} from 'react';
import Modal from './Modal';

function GameBoardCell({ onClose, ...props }) { 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showAnswer, setShowAnswer] = useState('');
    const [clueViewed, setClueViewed] = useState(false);
    const handleClueClick = () => {
        setIsModalOpen(true)
        setClueViewed(true);
    }

    if (props.type === 'header') {
        return (
            <div className='game-board-category-header-cell'>
                <span id={props.category.id}>{props.category.title}</span>
            </div>
        )
    } else if (props.type === 'body') {
        return (
            <div className='game-board-category-body-cell' clue={props.clue}>
                <button 
                    id={props.clue.id} 
                    category={props.clue.category_id} 
                    onClick={handleClueClick}>
                    {clueViewed ? '' : <span>${props.clue.value}</span>}
                </button>
                {isModalOpen && (
                    <Modal classes="clue-modal" onClose={() => setIsModalOpen(false)}>
                        <div className={"modal-body " + showAnswer}>
                            <div className="clue-card answer-side">
                                <span>{props.clue.answer}</span>
                                <button onClick={() => setShowAnswer(null)}>Show Question</button>
                                <button className="action-button secondary" onClick={onClose}>Done</button>
                            </div>
                            <div className="clue-card question-side">
                                <span>{props.clue.question}</span>
                                <button onClick={() => setShowAnswer('show-answer')}>Show Answer</button>
                                <button className="action-button secondary" onClick={onClose}>Done</button>
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