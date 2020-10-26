import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('Testando o arquivo Pokemon.js', () => {
  it('1- É renderizado um card com as informações de determinado pokémon', () => {
    const { getByTestId, getAllByRole } = renderWithRouter(
      <Pokemon
        pokemon={ pokemons[0] }
        isFavorite={ { 25: false } }
      />,
    );
    const namePkm = getByTestId('pokemon-name');
    const typePkm = getByTestId('pokemonType');
    const weight = getByTestId('pokemon-weight');
    const image = getAllByRole('img');
    const srcImage = 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    expect(namePkm).toHaveTextContent('Pikachu');
    expect(typePkm).toHaveTextContent('Electric');
    expect(weight).toHaveTextContent('Average weight:6.0kg');
    expect(image[0].src).toBe(srcImage);
    expect(image[0].alt).toBe('Pikachu sprite');
  });

  it('2-O Pokémon da Pokédex contém um link de navegação para exibir detalhes', () => {
    const { getByRole } = renderWithRouter(
      <Pokemon
        pokemon={ pokemons[0] }
        isFavorite={ { 25: false } }
      />,
    );
    const link = getByRole('link', { name: 'More details' });
    expect(link).toBeInTheDocument();
    expect(link.href.split('http://localhost')[1]).toBe('/pokemons/25');
  });

  it('3-clicando no link de navegação é redirecionado para os detalhes', () => {
    const { getByRole } = renderWithRouter(
      <Pokemon
        pokemon={ pokemons[0] }
        isFavorite={ { 25: false } }
      />,
    );
    const link = getByRole('link', { href: '/pokemons/25' });
    expect(link).toBeInTheDocument();
  });

  it('4-A URL exibida no navegador muda para /pokemon/<id>', () => {
    const { getByRole, history } = renderWithRouter(
      <Pokemon
        pokemon={ pokemons[0] }
        isFavorite={ { 25: false } }
      />,
    );
    const link = getByRole('link', { href: '/pokemons/25' });
    fireEvent.click(link);
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  it('5-Existe um ícone de estrela nos Pokémons favoritados', () => {
    const { getAllByRole } = renderWithRouter(
      <Pokemon
        pokemon={ pokemons[0] }
        isFavorite={ { 25: true } }
      />,
    );
    const images = getAllByRole('img');
    expect(images[1].src.split('http://localhost')[1]).toBe('/star-icon.svg');
    expect(images[1].alt).toBe('Pikachu is marked as favorite');
  });
});
