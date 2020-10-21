import React from 'react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

describe('Testes do About:', () => {
  it('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    expect(getByText(/No favorite/)).toBeInTheDocument();
    expect(getByText(/pokemon found/)).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados', () => {
    const { getByText, queryByText } = renderWithRouter(
      <FavoritePokemons pokemons={ [pokemons[2]] } />,
    );
    const poke3 = getByText('Caterpie');
    const poke4 = queryByText('Ekans');
    expect(poke3).toBeInTheDocument();
    expect(poke4).not.toBeInTheDocument();
  });

  it('Teste se Não é exibido nenhum card de pokémon não favoritado', () => {
    const { queryByText } = renderWithRouter(
      <FavoritePokemons pokemons={ [] } />,
    );
    const poke4 = queryByText('Ekans');
    expect(poke4).not.toBeInTheDocument();
  });
});
