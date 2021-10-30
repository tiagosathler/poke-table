const FETCH_POKEMONS_URL = 'https://pokeapi.co/api/v2/pokemon/?limit=';

const ERROR_FETCH = 'Falha na resposta da requisição... tente mais tarde!';
const ERROR_FUNCTION = 'Falha na função da requisição...';

const QTD_DEFAULT = 150;

export default async function fetchPokemons(qtd = QTD_DEFAULT) {
  try {
    const response = await fetch(`${FETCH_POKEMONS_URL}${qtd}`);
    if (response.ok) {
      const { results } = await response.json();
      const pokemons = await Promise.all(results.map(async ({ url }) => {
        const newResponse = await fetch(url);
        const pokemonDetails = await newResponse.json();
        return pokemonDetails;
      }));
      return pokemons;
    }
    throw new Error(ERROR_FETCH);
  } catch (err) {
    if (err.message !== ERROR_FETCH) {
      throw new Error(ERROR_FUNCTION);
    }
    throw err;
  }
}
