import React, { useState, useContext, useEffect } from 'react';
import PokeContext from '../contexts/PokeContext';
import FilterContext from '../contexts/FilterContext';
import { selectors, apllyFilters } from '../services';

import Select from './Select';

function Filters() {
  const [abilities, setAbilities] = useState([]);
  const [types, setTypes] = useState([]);
  const { pokemons, setPokesRender } = useContext(PokeContext);
  const { filter, handleChange } = useContext(FilterContext);
  const { name, ability, type, height, weight } = filter;

  useEffect(() => {
    const abilitiesList = selectors(pokemons, 'abilities', 'ability');
    setAbilities(abilitiesList);

    const typesList = selectors(pokemons, 'types', 'type');
    setTypes(typesList);
  }, [pokemons]);

  useEffect(() => {
    const filtered = apllyFilters(filter, pokemons);
    setPokesRender(filtered);
  }, [filter]);

  return (

    <section>
      <label htmlFor="filterName">
        Filtra por nome
        <input
          id="filterName"
          type="text"
          name="name"
          value={ name }
          onChange={ handleChange }
        />
      </label>
      <Select
        setup={ [abilities, ability, 'Habilidade', 'ability'] }
      />
      <Select
        setup={ [types, type, 'Tipo', 'type'] }
      />
      <label htmlFor="filterHeight">
        Altura mínima
        <input
          id="filterHeight"
          type="number"
          name="height"
          min="0"
          value={ height }
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="filterWeight">
        Peso mínimo
        <input
          id="filterWeight"
          type="number"
          name="weight"
          min="0"
          value={ weight }
          onChange={ handleChange }
        />
      </label>

    </section>

  );
}

export default Filters;
