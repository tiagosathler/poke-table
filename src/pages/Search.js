import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import PokeContext from '../contexts/PokeContext';

function Search() {
  const INITIAL_NUMBER = 10;
  const [number, setNumber] = useState(INITIAL_NUMBER);

  const { getPokemonsList, isFetching, error, pokemons } = useContext(PokeContext);
  const { status, message } = error;
  return (
    <div>
      <label
        htmlFor="pokeqtd"
      >
        Escolha a quantidade de Pokemons
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
        Buscar
      </button>
      { isFetching && <h4>Carregando...</h4> }
      { status && <h4>{ `Erro ao carregar: ${message}` }</h4> }
      { pokemons.length > 0 && <Redirect to="/table" /> }
    </div>
  );
}

export default Search;
