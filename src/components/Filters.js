import React, { useState, useContext, useEffect } from 'react';
import PokeContext from '../contexts/PokeContext';
import FilterContext from '../contexts/FilterContext';
import { selectors } from '../services';

import Select from './Select';

function Filters() {
  const [abilities, setAbilities] = useState([]);
  const [types, setTypes] = useState([]);
  const { pokemons } = useContext(PokeContext);
  const { name, ability, type, handleChange } = useContext(FilterContext);

  useEffect(() => {
    const abilitiesList = selectors(pokemons, 'abilities', 'ability');
    setAbilities(abilitiesList);

    const typesList = selectors(pokemons, 'types', 'type');
    setTypes(typesList);
  }, [pokemons]);

  return (

    <section>
      <label htmlFor="filterName">
        Filtra por nome:
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

    </section>

  );
}

export default Filters;
