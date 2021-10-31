import React, { useContext } from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import PropTypes from 'prop-types';
import PokeContext from '../contexts/PokeContext';

function InputForm(props) {
  const { setup } = props;
  const [type, label, name, value] = setup;
  const { handleChange } = useContext(PokeContext);
  return (
    <FloatingLabel
      htmlFor={ `${name}-input` }
      label={ label }
      classname="mb-3"
    >

      <Form.Control
        id={ `${name}-input` }
        type={ type }
        name={ name }
        value={ value }
        min="0"
        onChange={ handleChange }
        placeholder={ label }
      />
    </FloatingLabel>
  );
}

InputForm.propTypes = {
  setup: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default InputForm;
