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

  it('A página principal da Pokédex é renderizada ao carregar a aplicação no caminho de URL /', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/');
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  it('O primeiro link deve possuir o texto Home com a URL `/`', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const links = getAllByRole('link');
    expect(links[0].text).toBe('Home');
  });
  
  it('O segundo link deve possuir o texto About com a URL /about', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const links = getAllByRole('link');
    expect(links[1].text).toBe('About');
  });

  it('O terceiro link deve possuir o texto Favorite Pokémons com a URL /favorites', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const links = getAllByRole('link');
    expect(links[2].text).toBe('Favorite Pokémons');
  });

  it('A aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação.', () => {
    const { history, getAllByRole } = renderWithRouter(<App />);
    const links = getAllByRole('link');
    fireEvent.click(links[0]);
    expect(history.location.pathname).toBe('/');
  });

  it('A aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação', () => {
    const { history, getAllByRole } = renderWithRouter(<App />);
    const links = getAllByRole('link');
    fireEvent.click(links[1]);
    expect(history.location.pathname).toBe('/about');
  });

  it('A aplicação é redirecionada para a página de Pokémons Favoritados, na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação', () => {
    const { history, getAllByRole } = renderWithRouter(<App />);
    const links = getAllByRole('link');
    fireEvent.click(links[2]);
    expect(history.location.pathname).toBe('/favorites');
  });

  it('A aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida', () => {
    const { history, getAllByRole } = renderWithRouter(<App />);
    history.push('/xxx');
    expect(history.location.pathname).toBe('/xxx');
    const h2 = getAllByRole('heading', { level: 2 });
    expect(h2[1]).toHaveTextContent('Page requested not found 😭');
  });
});