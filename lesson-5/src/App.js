import React, { useEffect, useState } from 'react';
import '../styles/styles.css';


const Character = ({ character }) => {
  return (
    <div className="hero-list-item">   
        <img src={character.image} alt={character.name} />
        <p className="hero-name">{character.name}</p>
        <p className="hero-status">{character.status}</p>
    </div>
  );
};


const FetchCharacter = ({results}) => {
  return (
      <div className="hero-list">
        {results.map(character => (
          <Character key={character.id} character={character} />
        ))}
      </div>
  );
}


const Pagination = ({ info, handleNextClick, handlePrevClick, isPrevDisabled, isNextDisabled, }) => {
  return (
    <div className="pagination">
      <button className="pagination__btn-prev" onClick={handlePrevClick} disabled={isPrevDisabled}>PREV</button>
      <span className="pagination__number">{(info.next) ? info.next.split('=')[1] - 1 : info.pages}</span>
      <button className="pagination__btn-next" onClick={handleNextClick} disabled={isNextDisabled}>NEXT</button>
    </div>
  );
};


function App() {
  const [url, setUrl] = useState('https://rickandmortyapi.com/api/character');
  const [info, setInfo] = useState({});
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPrevDisabled, setIsPrevDisabled] = useState(true); 
  const [isNextDisabled, setIsNextDisabled] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchCharacters = async (url) => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
        }

        const {info, results} = await response.json(); 

        setInfo(info);
        setResults(results);
        
        setIsPrevDisabled(!info.prev);
        setIsNextDisabled(!info.next);
        
      } catch (error) {
        console.error('Error:', error.message);
      } finally {
        setLoading(false);
      }
    }; 
    fetchCharacters(url);
  }, [url]);

  const handlePrevClick = () => { 
    if(info.prev) 
      {
        setUrl(info.prev);
      }
  }

  const handleNextClick = () => { 
    if(info.next) 
      {
        setUrl(info.next);
      }
  }
  
  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <div className="container">
      <h1 className="character__text">Character List</h1>
      <FetchCharacter results={results}/>
      <Pagination info={info} handleNextClick={handleNextClick} handlePrevClick={handlePrevClick} isPrevDisabled={isPrevDisabled} isNextDisabled={isNextDisabled}/>
    </div>
  );
}

export default App;
