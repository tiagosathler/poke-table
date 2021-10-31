import PropTypes from 'prop-types';
import React, { useState } from 'react';
import FilterContext from './FilterContext';

function FilterProvider(props) {
  const initialFilter = {
    name: '',
    ability: '',
    type: '',
    height: 0,
    weight: 0,
  };
  const [filter, setFilter] = useState(initialFilter);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFilter({ ...filter, [name]: value });
  };

  const { children } = props;
  return (
    <FilterContext.Provider value={ { filter, handleChange } }>
      { children }
    </FilterContext.Provider>
  );
}

FilterProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FilterProvider;
