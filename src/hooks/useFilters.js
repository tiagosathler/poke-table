import { useState, useCallback } from 'react';

function useFilters(INITITAL_STATE = []) {
  const [pokemonsFilter, setPokemonsFilter] = useState(INITITAL_STATE);

  const setFilters = useCallback(

    (pokemons, filter) => {
      const { name, ability, type, height, weight } = filter;
      let pokemonsFiltered = [...pokemons];
      if (name !== '') {
        pokemonsFiltered = pokemonsFiltered
          .filter((pokemon) => pokemon.name.includes(name));
      }
      if (ability !== '') {
        pokemonsFiltered = pokemonsFiltered
          .filter((pokemon) => pokemon.abilities
            .some((skill) => skill.ability.name === ability));
      }
      if (type !== '') {
        pokemonsFiltered = pokemonsFiltered
          .filter((pokemon) => pokemon.types
            .some((skill) => skill.type.name === type));
      }
      if (height !== 0) {
        pokemonsFiltered = pokemonsFiltered
          .filter((pokemon) => pokemon.height >= height);
      }
      if (weight !== 0) {
        pokemonsFiltered = pokemonsFiltered
          .filter((pokemon) => pokemon.weight >= weight);
      }
      setPokemonsFilter(pokemonsFiltered);
    },
    [],
  );

  return [pokemonsFilter, setFilters];
}

export default useFilters;
