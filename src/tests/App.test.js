import React from 'react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

it('renders a reading with the text `Pokédex`', () => {
  const { getByText } = renderWithRouter(<App />);
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

it('shows the Pokédex when the route is `/`', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/');
  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

it('Renderizando os links', () => {
  const { getAllByRole } = renderWithRouter(<App />);
  const links = getAllByRole('link');
  expect(links[0].text).toBe('Home');
  expect(links[1].text).toBe('About');
  expect(links[2].text).toBe('Favorite Pokémons');
});
