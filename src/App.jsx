import { useState, useEffect } from 'react';
import './App.css';
import {shuffled} from './util';
import Card from './Card';

const pokemonNames = [
  "charizard",
  "pikachu",
  "bulbasaur",
  "lucario",
  "gengar",
  "greninja",
  "eevee",
  "gardevoir",
  "umbreon",
  "dragonite"
]; 


function App() {
  const [pokemons, setPokemons] = useState([]);
  const[score, setScore] = useState(0);
  const [highestScore, setHighestScore] = useState(0);
  const[clicked, setClicked] = useState([]);

  useEffect(() => {
    Promise.all(pokemonNames.map(name => 
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then(response => response.json()))
    ).then((jsons) => {
        const newPokemons = jsons.map((json) => {
            return {name: json["name"], art:json["sprites"]["front_default"]}
        });
    
        setPokemons(newPokemons);
    });
},[]);


function handleClick(pokemonName){
 
  setClicked((prevClicked) => {
    const isClicked = prevClicked.includes(pokemonName);

    if (isClicked) {
      setHighestScore((prevHighestScore) => Math.max(prevHighestScore, score));
      setScore(0);
      setPokemons((prevPokemons) => shuffled([...prevPokemons]));
      return [];
    } else {
      setScore((prevScore) => prevScore + 1);
      setPokemons((prevPokemons) => shuffled([...prevPokemons]));
      return [...prevClicked, pokemonName];
      
    }
  });
}

  return (
 
    <div className="container">
      <header className="header">
      <p>Get points by clicking on an image but don't click on any more than once! {clicked}</p>
      <p>Score: {score}</p>
      <p>HighestScore: {highestScore}</p>
      </header>
      <div className='cards-wrapper'>
      { pokemons.map((pokemon)=>(
       <Card
       key={pokemon.name}
       cardInfo={pokemon}
       clickHandler={() => handleClick(pokemon.name)}
   />
      ))}
      </div>
    </div>
  
  )
}

export default App
