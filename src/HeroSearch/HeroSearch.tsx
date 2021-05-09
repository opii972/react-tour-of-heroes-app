import { ChangeEvent, useContext, useState } from 'react';
import { of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Link } from 'react-router-dom';

import { Hero } from '../hero';
import { HeroContext } from '../InMemoryHeroContextProvider';

import './HeroSearch.scoped.css';

const HeroSearch = () => {
  const { searchHeroes } = useContext(HeroContext);
  const [heroes, setHeroes] = useState<Hero[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    of(event.target.value)
      .pipe(
        // wait 300ms after each keystroke before considering the term
        debounceTime(300),

        // ignore new term if same as previous term
        distinctUntilChanged(),

        // switch to new search observable each time the term changes
        switchMap((term: string) => searchHeroes(term)),
      )
      .subscribe(value => setHeroes(value));
  };

  return (
    <div className={'search'}>
      <label htmlFor={'search-box'}>Hero Search</label>
      <input id={'search-box'} onChange={handleChange} />

      <ul className={'search-result'}>
        {heroes.map(({ id, name }) => (
          <li key={id}>
            <Link to={`/detail/${id}`}>{name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HeroSearch;
