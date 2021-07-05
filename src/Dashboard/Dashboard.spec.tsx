import { render, screen, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { of } from 'rxjs';

import Dashboard from './Dashboard';
import { HeroContext, HeroContextProps } from '../InMemoryHeroContextProvider';
import { Hero } from '../hero';

describe('Dashboard', () => {
  it('should render the title and no hero', () => {
    // GIVEN
    const getHeroes = jest.fn().mockImplementation(() => of([]));
    // WHEN
    render(
      <HeroContext.Provider value={{ getHeroes } as {} as HeroContextProps}>
        <Dashboard />
      </HeroContext.Provider>);
    // THEN
    expect(screen.getByRole('textbox', { name: /Hero Search/i })).toBeInTheDocument();
  });

  it('should render one hero', () => {
    // GIVEN
    const heroes: Hero[] = [
      { id: 1, name: 'foo' },
      { id: 2, name: 'bar' },
    ];
    const getHeroes = jest.fn().mockImplementation(() => of(heroes));
    // WHEN
    render(
      <BrowserRouter>
        <HeroContext.Provider value={{ getHeroes } as {} as HeroContextProps}>
          <Dashboard />
        </HeroContext.Provider>
      </BrowserRouter>,
    );
    // THEN
    expect(screen.getAllByRole('link')).toHaveLength(1);
    expect(screen.getByRole('link', { name: 'bar' })).toHaveAttribute('href', '/detail/2');
  });

  it('should display at most 4 heroes', () => {
    // GIVEN
    const heroes: Hero[] = [
      { id: 1, name: 'foo' },
      { id: 2, name: 'bar' },
      { id: 3, name: 'baz' },
      { id: 4, name: 'toto' },
      { id: 5, name: 'todo' },
    ];
    const getHeroes = jest.fn().mockImplementation(() => of(heroes));
    // WHEN
    render(
      <BrowserRouter>
        <HeroContext.Provider value={{ getHeroes } as {} as HeroContextProps}>
          <Dashboard />
        </HeroContext.Provider>
      </BrowserRouter>,
    );
    // THEN
    const listItems = screen.getAllByRole('link');
    expect(listItems).toHaveLength(4);
    listItems.forEach((item, index) => {
      const { getByText } = within(item);
      const { name } = heroes[++index];
      expect(getByText(name)).toHaveAttribute('href', `/detail/${++index}`);
    });
  });
});
