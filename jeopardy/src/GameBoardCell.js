import React, {useState} from 'react';
import Modal from './Modal';

function GameBoardCell({ onClose, ...props }) { 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAnswer, setShowAnswer] = useState(false);

    console.log(isModalOpen);

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
                    onClick={() => setIsModalOpen(true)}>
                    ${props.clue.value}
                </button>
                {isModalOpen && (
                    <Modal onClose={() => setIsModalOpen(false)}>
                        {isAnswer ? 
                            <div className="modal-body">
                                <span>{props.clue.answer}</span>
                                <button onClick={() => setShowAnswer(true)}>Show Answer</button>
                            </div>
                        : 
                            <div className="modal-body">
                                <span>{props.clue.answer}</span>
                                <button onClick={() => setShowAnswer(true)}>Show Answer</button>
                            </div>
                        }
                    </Modal>
                )}
            </div>
        )       
    } 
    return null;
};

export default GameBoardCell