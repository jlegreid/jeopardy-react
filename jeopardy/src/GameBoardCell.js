import React, {useState, useEffect, useContext } from 'react';
import Modal from './Modal';
import { ClueContext } from './ClueProvider';
import { setId } from './utils/SetId';

function GameBoardCell({ onClose, ...props }) { 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showAnswer, setShowAnswer] = useState(null);
    const [clueViewed, setClueViewed] = useState(false);
    const [gameClueId, setGameClueId] = useState(null);
    const [question, setQuestion] = useState(null);
    const [answer, setAnswer] = useState(null);
    const [dailyDouble, setDailyDouble] = useState(false);

    const dailyDoubleId = useContext(ClueContext);

    useEffect(() => {
        setGameClueId(setId());
        setQuestion(props.clue.question.replace( /(<([^>]+)>)/ig, '').replace(/[\\]/g, ''));
        setAnswer(props.clue.answer.replace( /(<([^>]+)>)/ig, '').replace(/[\\]/g, ''));
    }, [props.clue.question, props.clue.answer]);

    useEffect(()=> {
        if (dailyDoubleId === gameClueId) {
            setDailyDouble(true);
            console.log(`daily double set at ${dailyDoubleId}`)
        }
    }, [dailyDoubleId, gameClueId]);

    const handleClueClick = () => {
        setIsModalOpen(true);
        setClueViewed(true);
    }

    const handleOnClose = () => {
        setIsModalOpen(false);
    }
    
    return (
        <div 
            id={gameClueId} 
            className='game-board-category-body-cell' 
            clue={props.clue.id} 
            category={props.clue.category_id}>
            <button 
                className="game-board-category-body-cell-button"
                onClick={handleClueClick}>
                {clueViewed ? '' : <span>${props.clue.value}</span>}
            </button>
            {isModalOpen && (
                <Modal classes="clue-modal">
                    <div className={"modal-body " + showAnswer}>
                        <div className="clue-card answer-side">
                            <span className="clue-text">{answer}</span>
                            <div className="clue-card-actions">
                                <button className="action-button" onClick={() => setShowAnswer('show-question')}>Show Question</button>
                                <button className="action-button secondary" onClick={handleOnClose}>Done</button>
                            </div>
                        </div>
                        <div className="clue-card question-side">
                            {dailyDouble ? 'Daily Double!!' :
                                <>
                                    <span className="clue-text">{question}</span>
                                    <div className="clue-card-actions">
                                        <button className="action-button" onClick={() => setShowAnswer('show-answer')}>Show Answer</button>
                                        <button className="action-button secondary" onClick={handleOnClose}>Done</button>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    )       
};

export default GameBoardCell