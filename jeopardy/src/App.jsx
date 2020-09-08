import React, { useState } from 'react';
import GameHeader from './GameHeader';
import GameBoard from './GameBoard';
import GameBoardActions from './GameBoardActions';
import Shapes from './Shapes';
import { ModalProvider } from './ModalProvider';
import { Modal } from './Modal';
import { ClueProvider } from './ClueProvider';
import { lastId, resetId } from './utils/SetId';

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

  const generateDailyDouble = () => {
    setDailyDoubleId(Math.floor(Math.random() * lastId));
  };

  if (newGame) {
    const fetchCategories = async () => {
      setIsLoading(true);
      resetId();
      let categoryData = await fetch(
        `http://jservice.io/api/categories?count=${categoryCount}&offset=${categoryOffset}`,
        {
          method: 'GET',
        },
      );
      categoryData = await categoryData.json();

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
  const handleNewGame = () => {
    setShowNewGameModal(false);
    setNewGame(true);
    cluesArray.length && setCategoryOffset(categoryOffset + categoryCount)
  };

  const handleCategoryCount = (categoryCountNumber) => {
    setCategoryCount(categoryCount + categoryCountNumber);
  };

  const handleClueCount = (clueCountNumber) => {
    setClueCount(clueCount + clueCountNumber);
  };

  return (
    <ClueProvider context={dailyDoubleId}>
      <ModalProvider>
        <div className="App">
          <GameHeader />
          {showNewGameModal && (
            <Modal classes="alert-modal">
              <div className="modal-body">
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
              type="button"
              className="action-button large"
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
