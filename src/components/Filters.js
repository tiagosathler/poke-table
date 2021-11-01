import React from 'react';
import Form from 'react-bootstrap/Form';

import SelectForm from './SelectForm';
import InputForm from './InputForm';

import { abilitiesMock as abilities, typesMock as types } from '../data';

function Filters() {
  // implemente o formulário controlado
  // use as informações do estado
  // implemente a função de gerar as listas de abilities e types
  // acrescente as constantes relacionadas aos values dos elementos do form
  return (
    <section id="filter-section">
      <Form id="search-form">
        <InputForm
          setup={ ['text', 'Nome', 'name'] }
        />
        <SelectForm
          setup={ [abilities, 'Habilidade', 'ability'] }
        />
        <SelectForm
          setup={ [types, 'Tipo', 'type'] }
        />
        <InputForm
          setup={ ['number', 'Altura mínima', 'height'] }
        />
        <InputForm
          setup={ ['number', 'Peso mínimo', 'weight'] }
        />
      </Form>
    </section>
  );
}

export default Filters;
