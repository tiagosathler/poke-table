import React from 'react';
import PropTypes from 'prop-types';
import PokeContext from './PokeContext';

function PokeProvider(props) {
  const { children } = props;
  return (
    <PokeContext.Provider value={ null }>
      { children }
    </PokeContext.Provider>
  );
}

PokeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PokeProvider;
