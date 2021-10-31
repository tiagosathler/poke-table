import React, { useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import PokeContext from '../contexts/PokeContext';

function Search() {
  const INITIAL_NUMBER = 10;
  const [number, setNumber] = useState(INITIAL_NUMBER);

  const { getPokemonsList } = useContext(PokeContext);
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
            onChange={ ({ target: { value } }) => setNumber(value) }
          />
        </FloatingLabel>
        <Button
          type="button"
          variant="primary"
          onClick={ () => getPokemonsList(number) }
        >
          Sortear
        </Button>
      </Form>
    </section>
  );
}

export default Search;
