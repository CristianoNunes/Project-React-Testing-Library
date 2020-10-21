import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Requisito 1 - Testando o arquivo App.ja', () => {
  it('renders a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('A page principal da Pkdex é render ao carregar o app no caminho de URL /', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/');
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  it('O primeiro link deve possuir o texto Home com a URL `/`', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const links = getAllByRole('link');
    expect(links[0].text).toBe('Home');
  });

  it('O 2º link deve possuir o texto About com a URL /about', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const links = getAllByRole('link');
    expect(links[1].text).toBe('About');
  });

  it('O 3º link deve possuir o texto Favorite Pokémons com a URL /favorites', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const links = getAllByRole('link');
    expect(links[2].text).toBe('Favorite Pokémons');
  });

  it('O app vai p/ a pag inicial, na URL / ao clicar no link Home', () => {
    const { history, getAllByRole } = renderWithRouter(<App />);
    const links = getAllByRole('link');
    fireEvent.click(links[0]);
    expect(history.location.pathname).toBe('/');
  });

  it('O app vai p/ a pag About, na URL /about, ao clicar no link About', () => {
    const { history, getAllByRole } = renderWithRouter(<App />);
    const links = getAllByRole('link');
    fireEvent.click(links[1]);
    expect(history.location.pathname).toBe('/about');
  });

  it('O app vai p/ a pag de Pks Favs, na URL /favorites, ao clicar no link', () => {
    const { history, getAllByRole } = renderWithRouter(<App />);
    const links = getAllByRole('link');
    fireEvent.click(links[2]);
    expect(history.location.pathname).toBe('/favorites');
  });

  it('O app vai p/ a página Not Found ao entrar em uma URL desconhecida', () => {
    const { history, getAllByRole } = renderWithRouter(<App />);
    history.push('/xxx');
    expect(history.location.pathname).toBe('/xxx');
    const h2 = getAllByRole('heading', { level: 2 });
    expect(h2[1]).toHaveTextContent('Page requested not found 😭');
  });
});
