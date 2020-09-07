import React, {useState, useEffect } from 'react';
import GameHeader from './GameHeader';
import GameBoard from './GameBoard';
import GameBoardActions from './GameBoardActions';
import { ModalProvider } from './ModalProvider';

function App() {
  // Initial States
  const [categoryCount, setCategoryCount] = useState(6);
  const [categoryOffset, setCategoryOffset] = useState(0); 
  const [clueCount, setClueCount] = useState(5);
  const [cluesArray, setClues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newGame, setNewGame] = useState(false);

  // Fetch for categories and clues
  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
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
      setIsLoading(false);
    }

    fetchCategories();

  }, [categoryCount, categoryOffset]);

  if (newGame) {
    setCategoryOffset(categoryOffset + categoryCount);
    setNewGame(false);
  }

  // Event Handlers

  const handleCategoryCount = (categoryCountNumber) => {
    setCategoryCount(categoryCount + (categoryCountNumber));
  }

  const handleClueCount = (clueCountNumber) => {
    setClueCount(clueCount + (clueCountNumber))
    console.log(clueCount);
  }

  const handleNewGame = () => {
    setNewGame(window.confirm('Are you sure'));
  }
  
  return (
    <ModalProvider>
      <div className="App">
        <GameHeader />
        <GameBoardActions 
          incrementCategoryUp={() => handleCategoryCount(1)}
          incrementCategoryDown={() => handleCategoryCount(-1)}
          incrementClueUp={() => handleClueCount(1)}
          incrementClueDown={() => handleClueCount(-1)}
          getNewGame={handleNewGame}
        />
        <GameBoard 
          cluesArray={cluesArray} 
          loading={isLoading} 
          clueCount={clueCount} 
        />        
      </div>
    </ModalProvider>
  );
};

export default App