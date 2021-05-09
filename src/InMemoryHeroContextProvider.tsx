import React, { ReactElement, useContext, useState } from 'react';
import { from, Observable, of } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';

import { Hero } from './hero';
import { MessageContext } from './MessageContextProvider';

export type HeroContextProps = {
  getHeroes: () => Observable<Hero[]>;
  getHero: (id: number) => Observable<Hero>;
  searchHeroes: (term: string) => Observable<Hero[]>;
  addHero: (hero: Hero) => Observable<Hero>;
  deleteHero: (id: number) => Observable<Hero>;
  updateHero: (hero: Hero) => Observable<void>;
}

type HeroContextProviderProps = {
  children: ReactElement | ReactElement[];
};

export const HeroContext = React.createContext<HeroContextProps>({} as HeroContextProps);

const InMemoryHeroContextProvider = ({ children }: HeroContextProviderProps) => {
  const { add } = useContext(MessageContext);
  const [heroes, setHeroes] = useState<Hero[]>([
    { id: 11, name: 'Dr Nice' },
    { id: 12, name: 'Narco' },
    { id: 13, name: 'Bombasto' },
    { id: 14, name: 'Celeritas' },
    { id: 15, name: 'Magneta' },
    { id: 16, name: 'RubberMan' },
    { id: 17, name: 'Dynama' },
    { id: 18, name: 'Dr IQ' },
    { id: 19, name: 'Magma' },
    { id: 20, name: 'Tornado' },
  ]);

  const context: HeroContextProps = {
    getHeroes: (): Observable<Hero[]> => (
      of(heroes)
        .pipe(
          tap(_ => log('fetched heroes')),
        )
    ),
    getHero: (id): Observable<Hero> => (
      from(heroes)
        .pipe(
          filter(({ id: heroId }) => heroId === id),
          tap(_ => log(`fetched hero id=${id}`)),
        )
    ),
    searchHeroes: (term: string): Observable<Hero[]> => (
      of(heroes)
        .pipe(
          map(heroes => !term.trim() ?
            [] :
            heroes.filter(({ name }) => name.toLowerCase().includes(term.toLowerCase()))),
          tap(x => x.length ?
            log(`found heroes matching "${term}"`) :
            log(`no heroes matching "${term}"`)),
        )
    ),
    addHero: (hero: Hero): Observable<Hero> => {
      const id = heroes.length > 0 ? Math.max(...heroes.map(({ id }) => id)) + 1 : 11;
      const newHero = { ...hero, id };

      return of(newHero)
        .pipe(
          tap(() => {
            if (heroes.length >= 15) {
              throw new Error('Limit reached');
            }
          }),
          catchError(handleError<Hero>('addHero limit reached')),
          tap((hero: Hero) => {
            if (hero) {
              setHeroes([...heroes, hero]);
            }
          }),
          tap(x => x ?
            log(`added hero w/ id=${id}`) :
            log(`addHero limit reached`),
          ),
        );
    },
    deleteHero: (id: number): Observable<Hero> => {
      const heroFound = heroes.find(({ id: heroId }) => heroId === id) || {} as Hero;

      return of(heroFound)
        .pipe(
          tap(() => setHeroes([...heroes.filter(({ id: heroId }) => heroId !== id)])),
          tap(_ => log(`deleted hero id=${id}`)),
        );
    },
    updateHero: (hero: Hero): Observable<void> => {
      const heroFound = heroes.find(({ id }) => id === hero.id);
      const newHero = { ...heroFound, ...hero };

      return of(void 0)
        .pipe(
          tap(() => setHeroes(heroes.map(hero => hero.id === newHero.id ? newHero : hero))),
          tap(_ => log(`updated hero id=${hero.id}`)),
        );
    },
  };

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  const handleError = <T, >(operation = 'operation', result?: T) => (error: any): Observable<T> => {
    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };

  /** Log a HeroService message with the MessageService */
  const log = (message: string): void => add(`HeroService: ${message}`);

  return (
    <HeroContext.Provider value={context}>
      {children}
    </HeroContext.Provider>
  );
};

export default InMemoryHeroContextProvider;
