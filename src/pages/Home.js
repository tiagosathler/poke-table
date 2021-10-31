// import React from 'react';
import React, { useContext, useEffect } from 'react';
import PokeContext from '../contexts/PokeContext';
import Header from '../components/Header';
import Search from '../components/Search';
import Filters from '../components/Filters';
import Table from '../components/Table';
import FilterProvider from '../contexts/FilterProvider';

function Home() {
  const { getPokemonsList, isFetching, error, pokemons } = useContext(PokeContext);
  const { hasError, message } = error;

  useEffect(() => {
    getPokemonsList();
  }, []);

  return (
    <main>
      <Header />
      <Search />
      { pokemons.length > 0 && <FilterProvider><Filters /></FilterProvider> }
      { pokemons.length > 0 && <Table /> }
      { isFetching && <h4>Carregando...</h4> }
      { hasError && <h4>{ `Erro ao carregar: ${message}` }</h4> }
    </main>
  );
}

export default Home;
