import React from 'react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

it('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
  const { history, getByText } = renderWithRouter(<App />);
  history.push('/favorites');
  expect(history.location.pathname).toBe('/favorites');
  expect(getByText(/No favorite/)).toBeInTheDocument();
  expect(getByText(/pokemon found/)).toBeInTheDocument();
});
