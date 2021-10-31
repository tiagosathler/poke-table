import React, { useState, useContext } from 'react';
import PokeContext from '../contexts/PokeContext';

function Search() {
  const INITIAL_NUMBER = 10;
  const [number, setNumber] = useState(INITIAL_NUMBER);

  const { getPokemonsList } = useContext(PokeContext);
  return (
    <div>
      <label
        htmlFor="pokeqtd"
      >
        Sorteie Outros Pokémons
        { ' '}
        <input
          id="pokeqtd"
          type="number"
          max="150"
          min="1"
          placeholder="1 a 150"
          value={ number }
          onChange={ ({ target: { value } }) => setNumber(value) }
        />
      </label>
      <button
        type="button"
        onClick={ () => getPokemonsList(number) }
      >
        Sortear
      </button>
    </div>
  );
}

export default Search;
