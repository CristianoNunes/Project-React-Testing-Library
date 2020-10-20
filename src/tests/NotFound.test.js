import React from 'react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testes do NotFound:', () => {
  it('Teste se página contém um heading h2 com o texto Page requested not found 😭', () => {
    const { history, getAllByRole } = renderWithRouter(<App />);
    history.push('/xxx');
    expect(history.location.pathname).toBe('/xxx');
    const h2 = getAllByRole('heading', { level: 2 });
    expect(h2[1]).toHaveTextContent('Page requested not found 😭');
  });

  it('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', async () => {
    const { getByRole, history } = renderWithRouter(<App />);
    history.push('/about');
    const img = getByRole('img');
    const srcImg = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(img.src).toBe(srcImg);
  });
});
