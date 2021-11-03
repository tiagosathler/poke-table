// import React from 'react';
import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Search from '../components/Search';
import Filters from '../components/Filters';
import PokeTable from '../components/PokeTable';
import PokeContext from '../context/PokeContext';

function Home() {
  // implemente a chamada a requisição externa (API)
  const {
    getPokemons,
    pokemons,
    pokesRender,
    isFetching,
    error } = useContext(PokeContext);
  const { hasError, message } = error;

  useEffect(() => {
    getPokemons();
  }, []);

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
