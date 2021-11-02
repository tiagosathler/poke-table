import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PokeContext from './PokeContext';
import { fetchPokemons } from '../services';

function PokeProvider(props) {
  const INITIAL_STATE = {
    name: '',
    ability: '',
    type: '',
    height: 0,
    weight: 0,
  };

  const INITIAL_ERROR = {
    hasError: false,
    message: '',
  };

  const [filter, setFilter] = useState(INITIAL_STATE);
  const [pokemons, setPokemons] = useState([]);
  const [error, setError] = useState(INITIAL_ERROR);
  const [isFetching, setIsFetching] = useState(false);
  const [pokeRender, setPokeRender] = useState([pokemons]);

  const { name, ability, type, height, weight } = filter;
  // const { name } = filter;

  useEffect(() => {
    let arrayPokemons = [...pokemons];
    if (name !== '') {
      const regex = new RegExp(name, 'ig');
      arrayPokemons = arrayPokemons
        .filter(({ name: pokemon }) => pokemon.search(regex) >= 0);
    }
    if (ability !== '') {
      arrayPokemons = arrayPokemons
        .filter(({ abilities }) => abilities
          .some(({ ability: abi }) => abi.name === ability));
    }
    if (type !== '') {
      arrayPokemons = arrayPokemons
        .filter(({ types }) => types
          .some(({ type: typ }) => typ.name === type));
    }
    if (weight > 0) {
      arrayPokemons = arrayPokemons
        .filter(({ weight: wei }) => wei >= weight);
    }
    if (height > 0) {
      arrayPokemons = arrayPokemons
        .filter(({ height: hei }) => hei >= height);
    }
    setPokeRender(arrayPokemons);
  }, [filter, pokemons]);

  const handleChange = (event) => {
    const { target } = event;
    const { name: nameInput, value } = target;
    setFilter({ ...filter, [nameInput]: value });
  };

  const getPokemons = async (qtd) => {
    try {
      setIsFetching(true);
      const result = await fetchPokemons(qtd);
      setPokemons(result);
      setIsFetching(false);
    } catch (err) {
      setIsFetching(true);
      setError({ hasError: true, message: err.message });
      setIsFetching(false);
    }
  };

  const context = {
    filter,
    error,
    pokemons,
    pokeRender,
    isFetching,
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
