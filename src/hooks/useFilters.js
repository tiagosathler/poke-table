import { useState } from 'react';

function useFilters(filter, initialState) {
  const [pokemons, setPokemons] = useState([...initialState]);
  const [pokesFilter, setPokeFilter] = useState([]);

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
  return [pokesFilter, setPokemons];
}

export default useFilters;
