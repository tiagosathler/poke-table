import React, { useContext } from 'react';
import PokeContext from '../contexts/PokeContext';

function Table() {
  const { pokemons } = useContext(PokeContext);
  return (
    <main>
      <table>
        <thead>
          <tr>
            <th>&nbsp;</th>
            <th>Id</th>
            <th>Name</th>
            <th>Abilities</th>
            <th>Types</th>
            <th>Height</th>
            <th>Weight</th>
          </tr>
        </thead>
        <tbody>
          { pokemons.map(({
            id,
            sprites,
            name,
            abilities,
            types,
            height,
            weight,
          }) => (
            <tr key={ id }>
              <td><img src={ sprites.front_default } alt={ name } /></td>
              <td>{ id }</td>
              <td>{ name }</td>
              <td>
                <ol>
                  { abilities.map(({ ability }, index) => (
                    <li key={ `ability${index}` }>{ ability.name }</li>
                  ))}
                </ol>
              </td>
              <td>
                <ol>
                  { types.map(({ type }, index) => (
                    <li key={ `type${index}` }>{ type.name }</li>
                  ))}
                </ol>
              </td>
              <td>{ height }</td>
              <td>{ weight }</td>
            </tr>
          )) }
        </tbody>
      </table>
    </main>
  );
}

export default Table;
