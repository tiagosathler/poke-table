import React, { useState, useContext, useEffect } from 'react';
import PokeContext from '../contexts/PokeContext';
import Select from './Select';
import { selectors } from '../services';

function Filters() {
  const [abilities, setAbilities] = useState([]);
  const [types, setTypes] = useState([]);
  const { pokemons, filter, handleChange } = useContext(PokeContext);
  const { name, ability, type, height, weight } = filter;

  useEffect(() => {
    const abilitiesList = selectors(pokemons, 'abilities', 'ability');
    setAbilities(abilitiesList);

    const typesList = selectors(pokemons, 'types', 'type');
    setTypes(typesList);
  }, [pokemons]);

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
