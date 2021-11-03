import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PokeContext from './PokeContext';
import useFilters from '../hooks/useFilters';
import { fetchPokemons } from '../services';

function PokeProvider(props) {
  const INITITAL_FILTER = {
    name: '',
    ability: '',
    type: '',
    height: 0,
    weight: 0,
  };
  const [filter, setFilter] = useState(INITITAL_FILTER);
  const [pokemons, setPokemons] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState({ hasError: false, message: '' });
  const [pokesRender, setPokesRender] = useFilters([]);

  useEffect(() => {
    setPokesRender(pokemons, filter);
  }, [pokemons, filter]);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFilter({
      ...filter,
      [name]: value,
    });
  };

  const getPokemons = async (qtd) => {
    try {
      setIsFetching(true);
      const arrayPokemons = await fetchPokemons(qtd);
      setPokemons(arrayPokemons);
      setIsFetching(false);
      setError({ hasError: false, message: '' });
    } catch (erro) {
      setError({ hasError: true, message: erro.message });
    }
  };

  const context = {
    filter,
    pokemons,
    pokesRender,
    isFetching,
    error,
    handleChange,
    getPokemons,
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
