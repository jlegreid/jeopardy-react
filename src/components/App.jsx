import React, { useState, useEffect, useReducer } from 'react';
import GameHeader from './GameHeader';
import GameBoard from './game-board/GameBoard';
import GameBoardActions from './game-board/GameBoardActions';
import Shapes from './Shapes';
import { ModalProvider } from '../providers/ModalProvider';
import { Modal } from './modals/Modal';
import { ClueProvider } from '../providers/ClueProvider';
import { lastId, resetId } from '../utils/SetId';

const initialState = {
    categoryCount: 6,
    clueCount: 5
  };

const countReducer = (state, action) => {
  switch (action.type) {
    case 'increase':
      if (action.item === 'category') {
        return {
          ...state,
          categoryCount: state.categoryCount + action.amount
        };
      } else if (action.item === 'clue') {
        return {
          ...state,
          clueCount: state.clueCount + action.amount
        };
      } else {
        return state;
      };
    case 'decrease':
      if (action.item === 'category') {
        return {
          ...state,
          categoryCount: state.categoryCount - action.amount
        };
      } else if (action.item === 'clue') {
        return {
          ...state,
          clueCount: state.clueCount - action.amount
        };
      } else {
        return state;
      };
    default:
      return state;
  }
}

function App() {
  // Initial States
  const [categoryOffset, setCategoryOffset] = useState(0);
  const [cluesArray, setClues] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showNewGameModal, setShowNewGameModal] = useState(true);
  const [dailyDoubleId, setDailyDoubleId] = useState();

  const [count, dispatch] = useReducer(countReducer, initialState);

  // Sets the Daily Double id based on how many clues are showing
  const generateDailyDouble = () => {
    setDailyDoubleId(Math.floor(Math.random() * lastId));
  };

  // Populates the game board with new clues each time a new game is called for
  const fetchCategories = async () => {
    setIsLoading(true);
    resetId();

    // Fetches the categories
    let categoryData = await fetch(
      `https://jservice.io/api/categories?count=${count.categoryCount}&offset=${categoryOffset}`,
      {
        method: 'GET',
      },
    );
    categoryData = await categoryData.json();
    
    // Waits for the categories to come back, then fetches the clues in each category
    const clueData = await Promise.all(
      categoryData.map(async (category) => {
        const data = await fetch(
          `https://jservice.io/api/category?id=${category.id}`,
          {
            method: 'GET',
          },
        );
        return data.json();
      }),
    );

    setClues(clueData);
    setCategoryOffset(categoryOffset + count.categoryCount);
    generateDailyDouble();
    setIsLoading(false);
    console.log(count);
  };

  // Event Handlers
  // Closes the new game modal and sets up the new game
  const handleNewGame = () => {
    setShowNewGameModal(false);
    fetchCategories();
  };

  const handleCategoryCountUp = (chosenAmount) => {
    dispatch({ type: 'increase', item: 'category', amount: chosenAmount })
  }
  const handleCategoryCountDown = (chosenAmount) => {
    dispatch({ type: 'decrease', item: 'category', amount: chosenAmount })
  }
  const handleClueCountUp = (chosenAmount) => {
    dispatch({ type: 'increase', item: 'clue', amount: chosenAmount })
  }
  const handleClueCountDown = (chosenAmount) => {
    dispatch({ type: 'decrease', item: 'clue', amount: chosenAmount })
  }

  return (
    <ClueProvider context={dailyDoubleId}>
      <ModalProvider>
        <div className='App'>
          <GameHeader />
          {showNewGameModal && (
            <Modal classes='alert-modal'>
              <div className='modal-body'>
                <Shapes>
                  <GameBoardActions
                    incrementCategoryUp={() => handleCategoryCountUp(1)}
                    incrementCategoryDown={() => handleCategoryCountDown(1)}
                    incrementClueUp={() => handleClueCountUp(1)}
                    incrementClueDown={() => handleClueCountDown(1)}
                    clueCount={count.clueCount}
                    categoryCount={count.categoryCount}
                    firstTime={!cluesArray.length}
                    startNewGame={handleNewGame}
                    onClose={() => setShowNewGameModal(false)}
                  />
                </Shapes>
              </div>
            </Modal>
          )}
          <Shapes>
            <GameBoard
              cluesArray={cluesArray}
              loading={isLoading}
              clueCount={count.clueCount}
            />
          </Shapes>
          {!isLoading && (
            <button
              type='button'
              className='action-button large'
              onClick={() => setShowNewGameModal(true)}
            >
              New Game
            </button>
          )}
        </div>
      </ModalProvider>
    </ClueProvider>
  );
}

export default App;
