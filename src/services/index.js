const FETCH_POKEMONS_URL = 'https://pokeapi.co/api/v2/pokemon/?limit=';
const FETCH_POKEMON_URL = 'https://pokeapi.co/api/v2/pokemon/';
const QTD_DEFAULT = 150;

export function fetchPokemons(qtd = QTD_DEFAULT) {
  fetch(`${FETCH_POKEMONS_URL}${qtd}`)
    .then((response) => (response.ok === true
      ? Promise.resolve(response.json().results)
      : Promise.reject(new Error('Falha na API'))));
}

export function fetchPokemonDetais(pokemon) {
  fetch(`${FETCH_POKEMON_URL}${pokemon}`)
    .then((response) => (response.ok === true
      ? response.json()
      : Promise.reject(new Error('Falha na API'))))
    .then((results) => results.map(({
      abilities,
      base_experience: experiencie,
      height,
      id,
      name,
      species,
      sprites,
      types,
      weight,
    }) => ({
      abilities,
      experiencie,
      height,
      id,
      name,
      species,
      sprites,
      types,
      weight,
    })));
}
