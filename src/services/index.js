const POKEAPI_URL = 'https://pokeapi.co/api/v2/pokemon';

const ERROR_FETCH = 'Falha na resposta da requisição... tente mais tarde!';
const ERROR_FUNCTION = 'Falha na função da requisição...';

const QTD_DEFAULT = 15;

// A service 'fetchPokemons' busca pela quantidade 'qtd' de Pokémons aleatoriamente
// da API https://pokeapi.co/ - PokéApi The RESTFul Pokémon API.
// Se não passar o parâmetro 'qtd' a service retornará 'QTD_DEFAULT' Pokémons (15)

// https://oieduardorabelo.medium.com/javascript-armadilhas-do-asyn-await-em-loops-1cdad44db7f0

export async function fetchPokemons(qtd = QTD_DEFAULT) {
  try {
    const firstFetch = await fetch(`${POKEAPI_URL}/?limit=1`);
    if (firstFetch.ok) {
      const { count } = await firstFetch.json();
      const array = new Array(Number(qtd)).fill('');
      const offsets = array.reduce((acc) => {
        let offset = Math.ceil(Math.random() * count);
        while (acc.includes(offset)) {
          offset = Math.ceil(Math.random() * count);
        }
        acc.push(offset);
        return acc;
      }, []);
      // console.log(offsets);

      const list = await Promise.all(offsets.map(async (offset) => {
        const secondFetch = await fetch(`${POKEAPI_URL}/?offset=${offset}&limit=1`);
        const { results: [object] } = await secondFetch.json();
        return object;
      }));
      // console.log(list);

      const pokemons = await Promise.all(list.map(async ({ url }) => {
        const thirdFetch = await fetch(url);
        const pokemonDetails = await thirdFetch.json();
        const {
          abilities, height, id, name, sprites, types, weight,
        } = pokemonDetails;
        const { front_default: frontDefault } = sprites;
        const obj = {
          abilities,
          height,
          id,
          name,
          sprites: { front_default: frontDefault },
          types,
          weight,
        };
        return obj;
      }));
      // console.log(pokemons);
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

// Função para gerar um array apartir das características desejadas
// de cada objeto do array (kind e chave type).
// Isto é necessário para gerar as opções do <select>
// Exemplo:
//   kind = abilities ou types - array com as qualidades
//   type = ability ou type - objeto com as qualidades (name)
export function selectors(array, kind, type) {
  return array.reduce((acc, { [kind]: arrayKind }) => {
    arrayKind.forEach(({ [type]: { name } }) => {
      if (!acc.includes(name)) {
        acc.push(name);
      }
    });
    return acc;
  }, []).sort();
}

// Função para aplicar os filtros ao array de Pokemons
// EVITAR USÁ-LA! Prefira criar um hook personlizado com essa estrutura
// Se, no entanto, quiser usar, tente chamá-la em useEffect;
export function apllyFilters(filters, array) {
  const { name, ability, type, height, weight } = filters;
  let pokemons = [...array];
  if (name !== '') {
    const regex = new RegExp(name, 'ig');
    pokemons = pokemons.filter(({ name: pokemon }) => pokemon.search(regex) >= 0);
  }
  if (ability !== '') {
    pokemons = pokemons
      .filter(({ abilities }) => abilities
        .some(({ ability: abi }) => abi.name === ability));
  }
  if (type !== '') {
    pokemons = pokemons
      .filter(({ types }) => types
        .some(({ type: typ }) => typ.name === type));
  }
  if (weight > 0) {
    pokemons = pokemons
      .filter(({ weight: wei }) => wei >= weight);
  }
  if (height > 0) {
    pokemons = pokemons
      .filter(({ height: hei }) => hei >= height);
  }
  return pokemons;
}
