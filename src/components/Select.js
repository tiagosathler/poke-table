import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import FilterContext from '../contexts/FilterContext';

function Select({ setup }) {
  const [array, value, label, name] = setup;
  const { handleChange } = useContext(FilterContext);
  return (
    <label htmlFor={ `${name}-id` }>
      { label }
      <select
        name={ name }
        id={ `${name}-id` }
        value={ value }
        onChange={ handleChange }
      >
        <option value="" disabled hidden>Escolha</option>
        { array.map((option) => (
          <option
            key={ option }
            value={ option }
          >
            { option }
          </option>
        )) }
      </select>
    </label>
  );
}

Select.propTypes = {
  setup: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default Select;
