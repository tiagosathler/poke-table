import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PokeContext from './PokeContext';
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
  const [pokesRender, setPokesRender] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState({ hasError: false, message: '' });

  useEffect(() => {
    const { name, ability, type, height, weight } = filter;
    let pokemonsFiltered = [...pokemons];
    if (name !== '') {
      pokemonsFiltered = pokemonsFiltered
        .filter((pokemon) => pokemon.name.includes(name));
    }
    if (ability !== '') {
      pokemonsFiltered = pokemonsFiltered
        .filter((pokemon) => pokemon.abilities
          .some((skill) => skill.ability.name === ability));
    }
    if (type !== '') {
      pokemonsFiltered = pokemonsFiltered
        .filter((pokemon) => pokemon.types
          .some((skill) => skill.type.name === type));
    }
    if (height !== 0) {
      pokemonsFiltered = pokemonsFiltered
        .filter((pokemon) => pokemon.height >= height);
    }
    if (weight !== 0) {
      pokemonsFiltered = pokemonsFiltered
        .filter((pokemon) => pokemon.weight >= weight);
    }
    setPokesRender(pokemonsFiltered);
  }, [filter, pokemons]);

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
