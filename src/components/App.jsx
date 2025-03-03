import React, { useState, useEffect } from 'react';
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
  const [chosenCategoryCount, setChosenCategoryCount] = useState(6);
  const [chosenClueCount, setChosenClueCount] = useState(5);
  const [cluesArray, setClues] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showNewGameModal, setShowNewGameModal] = useState(true);
  const [dailyDoubleId, setDailyDoubleId] = useState();

  // Sets the Daily Double id based on how many clues are showing
  const generateDailyDouble = () => {
    setDailyDoubleId(Math.floor(Math.random() * lastId));
  };

  // Populates the game board with new clues each time a new game is called for
  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      resetId();

      // Fetches the categories
      let categoryData = await fetch(
        `https://jservice.io/api/categories?count=${categoryCount}&offset=${categoryOffset}`,
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
      generateDailyDouble();
      setIsLoading(false);
    };

    fetchCategories();
  }, [categoryCount, categoryOffset]);

  // Event Handlers
  // Closes the new game modal and sets up the new game
  const handleNewGame = () => {
    setShowNewGameModal(false);
    setCategoryCount(chosenCategoryCount);
    setClueCount(chosenClueCount);
    cluesArray.length && setCategoryOffset(categoryOffset + categoryCount);
  };

  // Sets the preferred category count
  const handleChosenCategoryCount = (categoryCountNumber) => {
    setChosenCategoryCount(chosenCategoryCount + categoryCountNumber);
  };

  // Sets the preferred clue count
  const handleChosenClueCount = (clueCountNumber) => {
    setChosenClueCount(chosenClueCount + clueCountNumber);
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
                    incrementCategoryUp={() => handleChosenCategoryCount(1)}
                    incrementCategoryDown={() => handleChosenCategoryCount(-1)}
                    incrementClueUp={() => handleChosenClueCount(1)}
                    incrementClueDown={() => handleChosenClueCount(-1)}
                    clueCount={chosenClueCount}
                    categoryCount={chosenCategoryCount}
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
