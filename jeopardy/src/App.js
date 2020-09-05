import React, {useState, useEffect} from 'react';
import GameHeader from './GameHeader';
import GameBoard from './GameBoard';

function App() {
  const categoryCount = 20;
  const categoryOffset = 20;
  // const [categories, setCategories] = useState([]);
  const [cluesArray, setClues] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchCategories = async () => {
      let categoryData = await fetch(
        `http://jservice.io/api/categories?count=${categoryCount}&offset=${categoryOffset}`,
        {
          method: "GET",
        }
      )
      categoryData = await categoryData.json()

      // setCategories(categoryData);
      
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
    }

    fetchCategories();

  }, []);

  return (
    // console.log(isLoading),
    // console.log(categories),
    console.log(cluesArray),
    <div className="App">
      <GameHeader />
      <div className="game-board">
          <GameBoard cluesArray={cluesArray} />
      </div>
      <button className="action-button">Reset Game</button>
    </div>
  );
};

export default App