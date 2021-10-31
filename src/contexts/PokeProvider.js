import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PokeContext from './PokeContext';
import { fetchPokemons } from '../services';

function PokeProvider(props) {
  const [pokemons, setPokemons] = useState([]);
  const [pokesRender, setPokesRender] = useState(pokemons);

  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState({ hasError: false, message: '' });

  const getPokemonsList = async (qtd) => {
    try {
      setIsFetching(true);
      setPokemons([]);
      const pokemonsList = await fetchPokemons(qtd);
      setPokemons(pokemonsList);
      setPokesRender(pokemonsList);
      setIsFetching(false);
      setError({ hasError: false, message: '' });
    } catch (err) {
      setError({ hasError: true, message: err.message });
      setIsFetching(false);
    }
  };

  const context = {
    pokemons,
    pokesRender,
    isFetching,
    error,
    getPokemonsList,
    setPokesRender,
  };
  const { children } = props;

  return (
    <PokeContext.Provider value={ context }>
      { children }
    </PokeContext.Provider>
  );
}

PokeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PokeProvider;
