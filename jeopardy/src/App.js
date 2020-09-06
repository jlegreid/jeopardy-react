import React, {useState, useEffect} from 'react';
import GameHeader from './GameHeader';
import GameBoard from './GameBoard';
import { ModalProvider } from './ModalProvider';

function App() {
  const [categoryCount, setCategoryCount] = useState(6);
  const [categoryOffset, setCategoryOffset] = useState(0); 
  const [clueCount, setClueCount] = useState(5);
  const [cluesArray, setClues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [toggleClue, setToggleClue] = useState(false);

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

  const resetGame = () => {
    setCategoryOffset(categoryOffset + 6);
  }

  const handleCategoryCount = (categoryCountNumber) => {
    setCategoryCount(categoryCount + (categoryCountNumber));
  }

  const handleClueCount = (clueCountNumber) => {
    setClueCount(clueCount + (clueCountNumber))
  }

  console.log(cluesArray);


  return (
    <ModalProvider>
      <div className="App">
        <GameHeader />
        <div className="game-board">
          <button className="action-button increment-arrow arrow-down" onClick={() => handleClueCount(-1)} disabled={clueCount <= 1}>less clues</button>
          <button className="action-button increment-arrow arrow-up" onClick={() => handleClueCount(1)}>more clues</button>
          <GameBoard 
            cluesArray={cluesArray} 
            loading={isLoading} 
            clueCount={clueCount} 
          />
        </div>
        <button className="action-button increment-arrow arrow-down" onClick={() => handleCategoryCount(-1)} disabled={categoryCount <= 1}>less categories</button>
        <button className="action-button increment-arrow arrow-up" onClick={() => handleCategoryCount(1)}>more categories</button>
        <button className="action-button" onClick={resetGame}>Reset Game</button>
      </div>
    </ModalProvider>
  );
};

export default App