import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';

function Search() {
  // crie o estado controlado
  const INITITIAL_NUMBER = 10;
  const [number, setNumber] = useState(INITITIAL_NUMBER);
  // use a função callback do estado que dispara a ação do botão

  const handleChange = (event) => {
    const { target } = event;
    const { value } = target;
    setNumber(value);
  };

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
            placeholder="1 a 150"
            value={ number }
            onChange={ handleChange }
            // onChange={ (e) => setNumber(e.target.value) }
            // implemente o input controlado
          />
        </FloatingLabel>
        <Button
          type="button"
          variant="primary"
          // implemente a ação
        >
          Sortear
        </Button>
      </Form>
    </section>
  );
}

export default Search;
