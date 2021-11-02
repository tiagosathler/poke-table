// import React from 'react';
import React, { useEffect, useContext } from 'react';
import Header from '../components/Header';
import Search from '../components/Search';
import Filters from '../components/Filters';
import PokeTable from '../components/PokeTable';

import PokeContext from '../context/PokeContext';

function Home() {
  // busque as informações do estado

  const {
    getPokemons,
    pokemons,
    pokeRender,
    error,
    isFetching } = useContext(PokeContext);

  const { hasError, message } = error;
  useEffect(() => {
    getPokemons();
  }, []);

  // implemente a chamada a requisição externa (API)

  return (
    <main>
      <Header />
      <Search />
      { pokemons.length > 0 && <Filters /> }
      { pokeRender.length > 0 && pokemons.length > 0 && <PokeTable /> }
      { pokeRender.length === 0 && pokemons.length > 0 && <h3>Não encontrado</h3> }
      { isFetching && <h4>Carregando...</h4> }
      { hasError && <h4>{ `Erro ao carregar: ${message}` }</h4> }
    </main>
  );
}

export default Home;
