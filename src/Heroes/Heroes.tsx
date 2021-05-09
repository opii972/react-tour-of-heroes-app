import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { HeroContext } from '../InMemoryHeroContextProvider';
import { Hero } from '../hero';

import './Heroes.scoped.css';

const Heroes = () => {
  const { getHeroes, addHero, deleteHero } = useContext(HeroContext);
  const [heroName, setHeroName] = useState<string>('');
  const [heroes, setHeroes] = useState<Hero[]>([]);

  useEffect(() => {
    getHeroes().subscribe(heroes => setHeroes(heroes));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const add = (name: string): void => {
    addHero({ name } as Hero).subscribe(hero => {
      if (hero) {
        setHeroes([...heroes, hero]);
        setHeroName('');
      }
    });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setHeroName(event?.target?.value);
  };

  const handleDelete = (hero: Hero): void => {
    setHeroes(heroes?.filter(h => h !== hero));
    deleteHero(hero.id).subscribe();
  };

  return (
    <>
      <h2>My Heroes</h2>

      <div>
        <label htmlFor={'new-hero'}>Hero name: </label>
        <input name={'new-hero'} value={heroName} onChange={handleChange} />

        <button
          disabled={!heroName?.trim()}
          className={'add-button'}
          onClick={() => add(heroName)}
        >
          Add hero
        </button>
      </div>

      <ul className={'heroes'}>
        {heroes.map(hero => (
          <li key={hero.id}>
            <Link to={`/detail/${hero.id}`}>
              <span className={'badge'}>{hero.id}</span>
              {hero.name}
            </Link>
            <button
              className={'delete'}
              title={'delete hero'}
              onClick={() => handleDelete(hero)}
            >x
            </button>
          </li>),
        )}
      </ul>
    </>
  );
};

export default Heroes;
