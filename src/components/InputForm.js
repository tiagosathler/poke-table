import React from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import PropTypes from 'prop-types';

function InputForm(props) {
  const { setup } = props;
  // acrescente a constante relacionado ao 'value'
  const [type, label, name] = setup;
  // chame ao função callback para controle do estado
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
        min="0"
        // implemente o input controlado
        placeholder={ label }
      />
    </FloatingLabel>
  );
}

InputForm.propTypes = {
  setup: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default InputForm;
