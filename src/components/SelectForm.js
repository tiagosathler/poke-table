import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

function SelectForm({ setup }) {
  // acrescente a constante relacionado ao 'value'
  const [array, label, name, value, handleChange] = setup;
  // chame ao função callback para controle do estado
  return (
    <FloatingLabel
      className="mb-3"
      htmlFor={ `${name}-id` }
      label={ label }
    >
      <Form.Select
        name={ name }
        id={ `${name}-id` }
        // implemente o select controlado
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
