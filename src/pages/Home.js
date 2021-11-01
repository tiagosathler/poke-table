// import React from 'react';
import React from 'react';
import Header from '../components/Header';
import Search from '../components/Search';
import Filters from '../components/Filters';
import PokeTable from '../components/PokeTable';

import { pokemonsMock } from '../data';

const MOCK_HOME = {
  isFetching: false,
  error: { hasError: false, message: '' },
  pokemons: pokemonsMock,
  pokesRender: pokemonsMock,
};

function Home() {
  // busque as informações do estado
  const {
    isFetching,
    error,
    pokemons,
    pokesRender,
  } = MOCK_HOME;
  const { hasError, message } = error;

  // implemente a chamada a requisição externa (API)

  return (
    <main>
      <Header />
      <Search />
      { pokemons.length > 0 && <Filters /> }
      { pokesRender.length > 0 && pokemons.length > 0 && <PokeTable /> }
      { pokesRender.length === 0 && pokemons.length > 0 && <h3>Não encontrado</h3> }
      { isFetching && <h4>Carregando...</h4> }
      { hasError && <h4>{ `Erro ao carregar: ${message}` }</h4> }
    </main>
  );
}

export default Home;
