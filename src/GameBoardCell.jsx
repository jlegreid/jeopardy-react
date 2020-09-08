import React, { useState, useEffect, useContext } from 'react';
import Modal from './Modal';
import ClueCard from './ClueCard';
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
    setQuestion(
      props.clue.question.replace(/(<([^>]+)>)/gi, '').replace(/[\\]/g, ''),
    );
    setAnswer(
      props.clue.answer.replace(/(<([^>]+)>)/gi, '').replace(/[\\]/g, ''),
    );
  }, [props.clue.question, props.clue.answer]);

  useEffect(() => {
    if (dailyDoubleId === gameClueId) {
      setDailyDouble(true);
      console.log(`daily double set at ${dailyDoubleId}`);
    }
  }, [dailyDoubleId, gameClueId]);

  const handleClueClick = () => {
    setIsModalOpen(true);
    setClueViewed(true);
  };

  return (
    <div
      id={gameClueId}
      className='game-board-category-body-cell'
      clue={props.clue.id}
      category={props.clue.category_id}
    >
      <button
        className='game-board-category-body-cell-button'
        onClick={handleClueClick}
      >
        {clueViewed ? '' : <span>${props.clue.value}</span>}
      </button>
      {isModalOpen && (
        <Modal classes='clue-modal'>
          <ClueCard
            showAnswer={showAnswer}
            question={question}
            answer={answer}
            dailyDouble={dailyDouble}
            handleDailyDouble={() => setDailyDouble(false)}
            handleShowQuestion={() => setShowAnswer('show-question')}
            handleShowAnswer={() => setShowAnswer('show-answer')}
            onClose={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}

export default GameBoardCell;
