import React from 'react';
import { render, screen } from '@testing-library/react';
import { of } from 'rxjs';
import { HashRouter } from 'react-router-dom';

import App from './App';
import MessageContextProvider from './MessageContextProvider';
import { HeroContext, HeroContextProps } from './InMemoryHeroContextProvider';

test('renders learn react link', () => {
  const getHeroes = jest.fn().mockImplementation(() => of([]))
  render(
    <MessageContextProvider>
      <HeroContext.Provider value={{ getHeroes } as {} as HeroContextProps}>
        <HashRouter>
          <App />
        </HashRouter>
      </HeroContext.Provider>
    </MessageContextProvider>
  );
  const titleElement = screen.getByText(/Tour of Heroes/i);
  expect(titleElement).toBeInTheDocument();
});
