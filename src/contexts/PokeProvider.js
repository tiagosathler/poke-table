import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PokeContext from './PokeContext';
import fetchPokemons from '../services';

function PokeProvider(props) {
  const [pokemons, setPokemons] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState({ status: false, message: '' });

  const getPokemonsList = async (qtd) => {
    try {
      setIsFetching(true);
      const pokemonsList = await fetchPokemons(qtd);
      setPokemons([...pokemons, ...pokemonsList]);
      setIsFetching(false);
    } catch (err) {
      setError({ status: true, message: err.message });
      setIsFetching(false);
    }
  };

  const context = {
    pokemons,
    isFetching,
    error,
    getPokemonsList,
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
