import React, { useState } from 'react';
import GameHeader from './GameHeader';
import GameBoard from './game-board/GameBoard';
import GameBoardActions from './game-board/GameBoardActions';
import Shapes from './Shapes';
import { ModalProvider } from '../providers/ModalProvider';
import { Modal } from './modals/Modal';
import { ClueProvider } from '../providers/ClueProvider';
import { lastId, resetId } from '../utils/SetId';

function App() {
  // Initial States
  const [categoryCount, setCategoryCount] = useState(6);
  const [categoryOffset, setCategoryOffset] = useState(0);
  const [clueCount, setClueCount] = useState(5);
  const [cluesArray, setClues] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newGame, setNewGame] = useState(false);
  const [showNewGameModal, setShowNewGameModal] = useState(true);
  const [dailyDoubleId, setDailyDoubleId] = useState();

  // Sets the Daily Double id based on how many clues are showing
  const generateDailyDouble = () => {
    setDailyDoubleId(Math.floor(Math.random() * lastId));
  };

  // Populates the game board with new clues each time a new game is called for
  if (newGame) {
    const fetchCategories = async () => {
      setIsLoading(true);
      resetId();

      // Fetches the categories
      let categoryData = await fetch(
        `http://jservice.io/api/categories?count=${categoryCount}&offset=${categoryOffset}`,
        {
          method: 'GET',
        },
      );
      categoryData = await categoryData.json();
      
      // Waits for the categories to come back, then fetches the clues in each category
      const clueData = await Promise.all(
        categoryData.map(async (category) => {
          const data = await fetch(
            `http://jservice.io/api/category?id=${category.id}`,
            {
              method: 'GET',
            },
          );
          return data.json();
        }),
      );

      setClues(clueData);
      generateDailyDouble();
      setIsLoading(false);
    };

    fetchCategories();
    setNewGame(false);
  }

  // Event Handlers
  // Opens the new game modal and sets up the new game
  const handleNewGame = () => {
    setShowNewGameModal(false);
    setNewGame(true);
    cluesArray.length && setCategoryOffset(categoryOffset + categoryCount);
  };

  // Sets the preferred category count
  const handleCategoryCount = (categoryCountNumber) => {
    setCategoryCount(categoryCount + categoryCountNumber);
  };

  // Sets the preferred clue count
  const handleClueCount = (clueCountNumber) => {
    setClueCount(clueCount + clueCountNumber);
  };

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
                    incrementCategoryUp={() => handleCategoryCount(1)}
                    incrementCategoryDown={() => handleCategoryCount(-1)}
                    incrementClueUp={() => handleClueCount(1)}
                    incrementClueDown={() => handleClueCount(-1)}
                    clueCount={clueCount}
                    categoryCount={categoryCount}
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
              clueCount={clueCount}
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
