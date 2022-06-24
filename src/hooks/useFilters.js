import { useState, useCallback, useMemo } from 'react';

function useFilters(initialState = []) {
  const [pokesFilter, setPokeFilter] = useState([...initialState]);

  const INITIAL_FILTERS = useMemo(() => ({
    name: '',
    ability: '',
    type: '',
    height: 0,
    weight: 0,
  }), []);

  const setFilters = useCallback(
    (pokemons, filter = INITIAL_FILTERS) => {
      const { name, ability, type, height, weight } = filter;
      let filtered = ([...pokemons]);
      if (pokemons.length !== 0) {
        if (name !== '') {
          const regex = new RegExp(name, 'ig');
          filtered = filtered.filter(({ name: pokemon }) => pokemon.search(regex) >= 0);
        }
        if (ability !== '') {
          filtered = filtered
            .filter(({ abilities }) => abilities
              .some(({ ability: abi }) => abi.name === ability));
        }
        if (type !== '') {
          filtered = filtered
            .filter(({ types }) => types
              .some(({ type: typ }) => typ.name === type));
        }
        if (weight > 0) {
          filtered = filtered
            .filter(({ weight: wei }) => wei >= weight);
        }
        if (height > 0) {
          filtered = filtered
            .filter(({ height: hei }) => hei >= height);
        }
      }
      setPokeFilter(filtered);
    }, [INITIAL_FILTERS],
  );
  return [pokesFilter, setFilters];
}

export default useFilters;
