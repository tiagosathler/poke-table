import React, { useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import PokeContext from '../context/PokeContext';

function Search() {
  // crie o estado controlado
  const NUM_INICIAL = 10;
  const [number, setNumber] = useState(NUM_INICIAL);

  // use a função callback do estado que dispara a ação do botão
  const { getPokemons } = useContext(PokeContext);
  return (
    <section id="draw-section">
      <Form id="draw-form">
        <FloatingLabel
          htmlFor="pokeqtd"
          label="Quantidade"
        >
          <Form.Control
            id="pokeqtd"
            type="number"
            max="150"
            min="1"
            value={ number }
            placeholder="1 a 150"
            onChange={ (e) => setNumber(e.target.value) }
            // implemente o input controlado
          />
        </FloatingLabel>
        <Button
          type="button"
          variant="primary"
          // implemente a ação
          onClick={ () => getPokemons(number) }
        >
          Sortear
        </Button>
      </Form>
    </section>
  );
}

export default Search;
