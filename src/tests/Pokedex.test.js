import React from 'react';
import { fireEvent, getAllByTestId, queryByText } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';
import App from '../App';
import pokemons from '../data';

describe('Testando o arquivo Pokedex.js', () => {
  it('1- Exibe o próximo Pkm da lista qnd o btn Próximo pkm é clikdo', () => {
    const { getByRole, queryByText } = renderWithRouter(
      <Pokedex 
        pokemons={ [pokemons[0], pokemons[1], pokemons[2]] }
        isPokemonFavoriteById={ { 25: false, 4: false, 10:false } }
      />
    );
    // Item 1.1 - O botão deve conter o texto Próximo pokémon
    const proxBtn = getByRole('button', { name: 'Próximo pokémon' });
    expect(proxBtn).toBeInTheDocument();
    // Item 1.2 - Os Pokémons da lista devem ser mostrados, ao clicar no botão
    fireEvent.click(proxBtn);
    expect(queryByText(/Charmander/i)).toBeInTheDocument();
    fireEvent.click(proxBtn);
    expect(queryByText(/Caterpie/i)).toBeInTheDocument();
    // Item 1.2 - O primeiro da lista deve ser mostrado após o último Pokémon da lista
    fireEvent.click(proxBtn);
    expect(queryByText(/Pikachu/i)).toBeInTheDocument();
  });

  it('2- Teste se é mostrado apenas um Pokémon por vez', () => {
    const { getAllByTestId } = renderWithRouter(
      <Pokedex 
        pokemons={ [pokemons[0], pokemons[1], pokemons[2]] }
        isPokemonFavoriteById={ { 25: false, 4: false, 10:false } }
      />
    );
    const todosPokms = getAllByTestId('pokemon-name');
    const qtdPkm = 1;
    expect(todosPokms.length).toBe(qtdPkm);
  });

  it('3- Teste se a Pokédex tem os botões de filtro', () => {
    const { getByRole, getByTestId } = renderWithRouter(
      <Pokedex 
        pokemons={ [pokemons[0], pokemons[1], pokemons[2]] }
        isPokemonFavoriteById={ { 25: false, 4: false, 10:false } }
      />
    );
    const btnElectric = getByRole('button', {name: 'Electric'});
    const btnFire = getByRole('button', {name: 'Fire'});
    expect(btnElectric).toBeInTheDocument();
    expect(btnFire).toBeInTheDocument();

    fireEvent.click(btnElectric);
    const pokemon1 = getByTestId('pokemonType');
    expect(pokemon1).toHaveTextContent('Electric');

    fireEvent.click(btnFire);
    const pokemon2 = getByTestId('pokemonType');
    expect(pokemon2).toHaveTextContent('Fire');
  });

  it('4- Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const { getByRole, queryByText } = renderWithRouter(
      <Pokedex 
        pokemons={ [pokemons[0], pokemons[1], pokemons[2]] }
        isPokemonFavoriteById={ { 25: false, 4: false, 10:false } }
      />
    );
    const btnAll = getByRole('button', {name: 'All'});
    expect(btnAll).toBeInTheDocument();

    fireEvent.click(btnAll);
    expect(queryByText(/Pikachu/i)).toBeInTheDocument();
  });

  it('5- Teste se é criado, dinamicamente, um botão de filtro para cada tipo de Pokémon', () => {
    const { getByRole } = renderWithRouter(
      <Pokedex 
        pokemons={ [pokemons[0], pokemons[1], pokemons[2]] }
        isPokemonFavoriteById={ { 25: false, 4: false, 10:false } }
      />
    );
    const btnElectric = getByRole('button', {name: 'Electric'});
    const btnFire = getByRole('button', {name: 'Fire'});
    const btnBug = getByRole('button', {name: 'Bug'});
    expect(btnElectric).toBeInTheDocument();
    expect(btnFire).toBeInTheDocument();
    expect(btnBug).toBeInTheDocument();
  });

  it('6- Btn Prox pkm deve ser desabilitado qdo a lista filtrada de Pkmns tiver 1 só pkm.', () => {
    const { getByRole } = renderWithRouter(
      <Pokedex 
        pokemons={ [pokemons[0], pokemons[1], pokemons[2]] }
        isPokemonFavoriteById={ { 25: false, 4: false, 10:false } }
      />
    );
    const btnProx  = getByRole('button', { name: 'Próximo pokémon'});
    expect(btnProx).not.toHaveAttribute('disabled');

    const btnElectric = getByRole('button', { name: 'Electric'});
    fireEvent.click(btnElectric);

    expect(btnProx).toHaveAttribute('disabled');
  });
});
