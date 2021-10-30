// import React from 'react';
import React, { useContext } from 'react';
import Search from '../components/Search';
import PokeContext from '../contexts/PokeContext';
import Table from '../components/Table';

function Home() {
  const { isFetching, error, pokemons } = useContext(PokeContext);
  const { status, message } = error;
  return (
    <main>
      <Search />
      { pokemons.length > 0 && <Table /> }
      { isFetching && <h4>Carregando...</h4> }
      { status && <h4>{ `Erro ao carregar: ${message}` }</h4> }
    </main>
  );
}

export default Home;
