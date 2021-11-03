import React, { useState, useContext, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import PokeContext from '../context/PokeContext';
import { selectors } from '../services';

import SelectForm from './SelectForm';
import InputForm from './InputForm';

function Filters() {
  const [abilities, setAbilities] = useState([]);
  const [types, setTypes] = useState([]);

  const { filter, handleChange, pokemons } = useContext(PokeContext);

  useEffect(() => {
    const abilitiesArray = selectors(pokemons, 'abilities', 'ability');
    const typesArray = selectors(pokemons, 'types', 'type');
    setAbilities(abilitiesArray);
    setTypes(typesArray);
  }, [pokemons]);

  const { name, ability, type, height, weight } = filter;

  return (
    <section id="filter-section">
      <Form id="search-form">
        <InputForm
          setup={ ['text', 'Nome', 'name', name, handleChange] }
        />
        <SelectForm
          setup={ [abilities, 'Habilidade', 'ability', ability, handleChange] }
        />
        <SelectForm
          setup={ [types, 'Tipo', 'type', type, handleChange] }
        />
        <InputForm
          setup={ ['number', 'Altura mínima', 'height', height, handleChange] }
        />
        <InputForm
          setup={ ['number', 'Peso mínimo', 'weight', weight, handleChange] }
        />
      </Form>
    </section>
  );
}

export default Filters;
