import React from 'react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o arquivo NotFound.js', () => {
  it('Teste se página contém um heading h2 com o texto Page requested not found', () => {
    const { history, getAllByRole } = renderWithRouter(<App />);
    history.push('/xxx');
    expect(history.location.pathname).toBe('/xxx');
    const h2 = getAllByRole('heading', { level: 2 });
    expect(h2[1]).toHaveTextContent('Page requested not found 😭');
  });

  it('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', async () => {
    const { getAllByRole, history } = renderWithRouter(<App />);
    history.push('/xxx');
    const img = getAllByRole('img');
    const srcImg = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(img[1].src).toBe(srcImg);
  });
});
