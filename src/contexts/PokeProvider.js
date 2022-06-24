import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import PokeContext from './PokeContext';
import { fetchPokemons } from '../services';
import useFilters from '../hooks/useFilters';

function PokeProvider(props) {
  const [pokemons, setPokemons] = useState([]);

  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState({ hasError: false, message: '' });

  const initialFilter = {
    name: '',
    ability: '',
    type: '',
    height: 0,
    weight: 0,
  };
  const [filter, setFilter] = useState(initialFilter);
  const [pokesRender, setPokesRender] = useFilters(pokemons);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFilter({ ...filter, [name]: value });
  };

  useEffect(() => {
    setPokesRender(pokemons, filter);
  }, [setPokesRender, pokemons, filter]);

  const getPokemonsList = useCallback(
    async (qtd) => {
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
    },
    [setError, setIsFetching, setPokemons, setPokesRender],
  );

  const context = {
    pokemons,
    pokesRender,
    isFetching,
    error,
    filter,
    handleChange,
    setFilter,
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
