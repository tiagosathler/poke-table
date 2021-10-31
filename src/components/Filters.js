import React, { useState, useContext, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import PokeContext from '../contexts/PokeContext';
import SelectForm from './SelectForm';
import InputForm from './InputForm';
import { selectors } from '../services';

function Filters() {
  const [abilities, setAbilities] = useState([]);
  const [types, setTypes] = useState([]);
  const { pokemons, filter } = useContext(PokeContext);
  const { name, ability, type, height, weight } = filter;

  useEffect(() => {
    const abilitiesList = selectors(pokemons, 'abilities', 'ability');
    setAbilities(abilitiesList);

    const typesList = selectors(pokemons, 'types', 'type');
    setTypes(typesList);
  }, [pokemons]);

  return (

    <section id="filter-section">
      <Form id="search-form">
        <InputForm
          setup={ ['text', 'Nome', 'name', name] }
        />
        <SelectForm
          setup={ [abilities, 'Habilidade', 'ability', ability] }
        />
        <SelectForm
          setup={ [types, 'Tipo', 'type', type] }
        />
        <InputForm
          setup={ ['number', 'Altura mínima', 'height', height] }
        />
        <InputForm
          setup={ ['number', 'Peso mínimo', 'weight', weight] }
        />
      </Form>
    </section>

  );
}

export default Filters;
