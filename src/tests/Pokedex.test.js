import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testes da Pokedex:', () => {
  it('Teste se a página contém um heading h2 com o texto Encountered pokémons', () => {
    const { history, getAllByRole } = renderWithRouter(<App />);
    history.push('/');
    expect(history.location.pathname).toBe('/');
    const h2 = getAllByRole('heading', { level: 2 });
    expect(h2[1]).toHaveTextContent('Encountered pokémons');
  });

  it('Teste se é exibido o próximo Pkm da lista qnd o btn Próximo pkm é clikdo', () => {
    const { history, getByRole } = renderWithRouter(<App />);
    history.push('/');
    const btn = getByRole('button', { name: 'Próximo pokémon' });
    expect(btn).toBeInTheDocument();
  });

  it('Teste se o texto do botão deve ser All', () => {
    const { history, getByRole } = renderWithRouter(<App />);
    history.push('/');
    const btn = getByRole('button', { name: 'All' });
    expect(btn).toBeInTheDocument();
  });

  it('Teste se existe um data-testid com o texto pokemon-type-button', () => {
    const { history, getAllByTestId } = renderWithRouter(<App />);
    history.push('/');
    const btn = getAllByTestId('pokemon-type-button');
    expect(btn[0]).toBeInTheDocument();
  });

  it('Teste se ao clical no btn All o primeiro pokemon é Pikachu', () => {
    const { history, getByRole, getByText } = renderWithRouter(<App />);
    history.push('/');
    const btnAll = getByRole('button', { name: 'All' });
    fireEvent.click(btnAll);
    const pkmName = getByText(/Pikachu/);
    expect(pkmName).toBeInTheDocument();
  });

  it('Teste se ao clical no btn Fire o primeiro pokemon é do tipo Fire', () => {
    const { history, getByRole, getByTestId } = renderWithRouter(<App />);
    history.push('/');
    const btnFire = getByRole('button', { name: 'Fire' });
    fireEvent.click(btnFire);
    const typePokemon = getByTestId('pokemonType');
    expect(typePokemon).toBeInTheDocument();
  });
});
