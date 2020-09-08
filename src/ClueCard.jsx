import React from 'react';

function ClueCard({
  handleShowQuestion,
  handleShowAnswer,
  handleDailyDouble,
  onClose,
  ...props
}) {
  return (
    <div className={'modal-body ' + props.showAnswer}>
      <div className='clue-card answer-side'>
        <span className='clue-text'>{props.answer}</span>
        <div className='modal-actions'>
          <button className='action-button' onClick={handleShowQuestion}>
            Show Question
          </button>
          <button className='action-button secondary' onClick={onClose}>
            Done
          </button>
        </div>
      </div>
      <div className='clue-card question-side'>
        {props.dailyDouble ? (
          <>
            <span className='clue-text'>Daily Double!</span>
            <div className='modal-actions'>
              <button className='action-button' onClick={handleDailyDouble}>
                Show Question
              </button>
            </div>
          </>
        ) : (
          <>
            <span className='clue-text'>{props.question}</span>
            <div className='modal-actions'>
              <button className='action-button' onClick={handleShowAnswer}>
                Show Answer
              </button>
              <button className='action-button secondary' onClick={onClose}>
                Done
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ClueCard;
