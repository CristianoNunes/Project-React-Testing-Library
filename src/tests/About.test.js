import React from 'react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Testes do About:', () => {
  it('A página contém as informações sobre a Pokédex.', () => {
    const { history, getByText } = renderWithRouter(<About />);
    expect(history.location.pathname).toBe('/about');
    const information = getByText(/This application simulates a Pokédex/);
    expect(information).toBeInTheDocument();
  });

  it('A página contém um heading h2 com o texto About Pokédex', () => {
    const { history, getAllByRole } = renderWithRouter(<About />);
    expect(history.location.pathname).toBe('/about');
    const h2 = getAllByRole('heading', { level: 2 });
    expect(h2[1]).toHaveTextContent('About Pokédex');
  });

  it('A página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { container } = renderWithRouter(<About />);
    const p = container.querySelectorAll('p');
    const qtd = 2;
    expect(p.length).toBe(qtd);
  });

  it('A página contém a seguinte imagem de uma Pokédex', () => {
    const { getByRole, history } = renderWithRouter(<About />);
    history.push('/about');
    const img = getByRole('img');
    const srcImg = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(img.src).toBe(srcImg);
  });
});
