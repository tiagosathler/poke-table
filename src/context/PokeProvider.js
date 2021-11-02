import React, { useState } from 'react';
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

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setFilter({
      ...filter,
      [name]: value,
    });
  };

  const getPokemons = async (qtd) => {
    try {
      const arrayPokemons = await fetchPokemons(qtd);
      setPokemons(arrayPokemons);
    } catch (err) {
      console.log(null);
    }
  };

  const context = {
    filter,
    pokemons,
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
