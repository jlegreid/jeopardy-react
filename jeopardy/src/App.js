import React, {useState } from 'react';
import GameHeader from './GameHeader';
import GameBoard from './GameBoard';
import GameBoardActions from './GameBoardActions';
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

  if (newGame) {
    const fetchCategories = async () => {
      setIsLoading(true);
      resetId();
      let categoryData = await fetch(
        `http://jservice.io/api/categories?count=${categoryCount}&offset=${categoryOffset}`,
        {
          method: "GET",
        }
      )
      categoryData = await categoryData.json()
      
      let clueData = await Promise.all(
        categoryData.map(async category => {
        let data = await fetch(
          `http://jservice.io/api/category?id=${category.id}`,
          {
            method: "GET",
          }
        )
        return data.json();
      }));

      setClues(clueData);
      generateDailyDouble();
      setIsLoading(false);
    }

    fetchCategories();
    setNewGame(false);
  }

  const generateDailyDouble = () => {
    setDailyDoubleId(Math.floor((Math.random() * lastId)));
  }

  // Event Handlers
  const handleNewGame = () => {
    setShowNewGameModal(false); 
    setCategoryOffset(categoryOffset + categoryCount)
    setNewGame(true)
  }

  const handleCategoryCount = (categoryCountNumber) => {
    setCategoryCount(categoryCount + (categoryCountNumber));
  }

  const handleClueCount = (clueCountNumber) => {
    setClueCount(clueCount + (clueCountNumber))
  }
  
  return (
    <ClueProvider context={dailyDoubleId}>
      <ModalProvider>
        <div className="App">
          <GameHeader />
          <button className="action-button" onClick={() => setShowNewGameModal(true)}>New Game</button>
          {showNewGameModal && (
            <Modal classes="alert-modal">
              <div className="modal-body">
                <GameBoardActions 
                  incrementCategoryUp={() => handleCategoryCount(1)}
                  incrementCategoryDown={() => handleCategoryCount(-1)}
                  incrementClueUp={() => handleClueCount(1)}
                  incrementClueDown={() => handleClueCount(-1)}
                  clueCount={clueCount}
                  categoryCount={categoryCount}
                  startNewGame={handleNewGame}
                  onClose={() => setShowNewGameModal(false)}
                />
              </div>
            </Modal>
          )}
          <GameBoard 
            cluesArray={cluesArray} 
            loading={isLoading} 
            clueCount={clueCount} 
          />        
        </div>
      </ModalProvider>
    </ClueProvider>
  );
};

export default App