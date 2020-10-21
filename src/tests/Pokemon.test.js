import React from 'react';
import { fireEvent, getByTestId, getByText } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testes de Pokemon:', () => {
  it('O nome correto do Pokémon deve ser mostrado na tela', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const pName = getByTestId("pokemon-name");
    expect(pName).toHaveTextContent('Pikachu');

  });

  it('O Tipo correto do Pokémon deve ser mostrado na tela', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const pType = getByTestId("pokemonType");
    expect(pType).toHaveTextContent('Electric');
  });

  it('O Peso correto do Pokémon deve ser mostrado na tela', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const pWeight = getByTestId("pokemon-weight");
    expect(pWeight).toHaveTextContent('Average weight: 6.0 kg');
  });

  it('O Link correto do Pokémon de acordo com id', () => {
    const { getByRole } = renderWithRouter(<App />);
    const link = getByRole('link', { name: 'More details' });
    expect(link.href.split('http://localhost')[1]).toBe('/pokemons/25');
  });

  it('Teste se página mostra a imagem', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const img = getAllByRole('img');
    const srcImg = 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    expect(img[0].src).toBe(srcImg);
    expect(img[0].alt).toBe('Pikachu sprite');
  });
});
