import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import PokeContext from '../contexts/PokeContext';

function SelectForm({ setup }) {
  const [array, label, name, value] = setup;
  const { handleChange } = useContext(PokeContext);
  return (
    <FloatingLabel
      className="mb-3"
      htmlFor={ `${name}-id` }
      label={ label }
    >
      <Form.Select
        name={ name }
        id={ `${name}-id` }
        value={ value }
        onChange={ handleChange }
      >
        <option value="">Todos</option>
        { array.map((option) => (
          <option
            key={ option }
            value={ option }
          >
            { option }
          </option>
        )) }
      </Form.Select>
    </FloatingLabel>
  );
}

SelectForm.propTypes = {
  setup: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default SelectForm;
