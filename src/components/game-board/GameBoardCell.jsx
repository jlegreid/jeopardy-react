import React, { useState, useEffect, useContext } from 'react';
import Modal from '../modals/Modal';
import ClueCard from '../clue-card/ClueCard';
import { ClueContext } from '../../providers/ClueProvider';
import { setId } from '../../utils/SetId';

function GameBoardCell({ onClose, ...props }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAnswer, setShowAnswer] = useState(null);
  const [clueViewed, setClueViewed] = useState(false);
  const [gameClueId, setGameClueId] = useState(null);
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [dailyDouble, setDailyDouble] = useState(false);

  // Get the daily double Id
  const dailyDoubleId = useContext(ClueContext);

  // Sets an Id for each clue, used for daily double
  // Strips uneccessary characters from the clues
  useEffect(() => {
    setGameClueId(setId());
    setQuestion(
      props.clue.question.replace(/(<([^>]+)>)/gi, '').replace(/[\\]/g, ''),
    );
    setAnswer(
      props.clue.answer.replace(/(<([^>]+)>)/gi, '').replace(/[\\]/g, ''),
    );
  }, [props.clue.question, props.clue.answer]);

  // Sets the daily double
  useEffect(() => {
    if (dailyDoubleId === gameClueId) {
      setDailyDouble(true);
      console.log(`daily double set at ${dailyDoubleId}`);
    }
  }, [dailyDoubleId, gameClueId]);

  // Opens the clue card and marks the board cell as viewed
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
