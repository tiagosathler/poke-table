import React, { useContext } from 'react';
import PokeContext from '../contexts/PokeContext';

function Table() {
  const { pokemons } = useContext(PokeContext);
  return (
    <table>
      <thead>
        <tr>
          <th>Índice</th>
          <th>Imagem</th>
          <th>Id</th>
          <th>Nome</th>
          <th>Habilidades</th>
          <th>Tipos</th>
          <th>Altura</th>
          <th>Peso</th>
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
        }, index) => (
          <tr key={ id }>
            <td>{ index + 1 }</td>
            <td><img src={ sprites.front_default } alt={ name } /></td>
            <td>{ id }</td>
            <td>{ name }</td>
            <td>
              <ol>
                { abilities.map(({ ability }, idx) => (
                  <li key={ `ability${idx}` }>{ ability.name }</li>
                ))}
              </ol>
            </td>
            <td>
              <ol>
                { types.map(({ type }, idx) => (
                  <li key={ `type${idx}` }>{ type.name }</li>
                ))}
              </ol>
            </td>
            <td>{ height }</td>
            <td>{ weight }</td>
          </tr>
        )) }
      </tbody>
    </table>

  );
}

export default Table;
