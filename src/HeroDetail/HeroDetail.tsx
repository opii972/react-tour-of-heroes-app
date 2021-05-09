import { useHistory, useParams } from 'react-router-dom';
import { ChangeEvent, useContext, useEffect, useState } from 'react';

import { Hero } from '../hero';
import { HeroContext } from '../InMemoryHeroContextProvider';

import './HeroDetail.scoped.css';

type HeroDetailRouteParams = {
  id: string | undefined
}

const HeroDetail = () => {
  const { id } = useParams<HeroDetailRouteParams>();
  const { getHero, updateHero } = useContext(HeroContext);
  const [hero, setHero] = useState<Hero>();
  const [heroName, setHeroName] = useState<string>('');
  const { goBack } = useHistory();

  useEffect(() => {
    getHero(+id!)
      .subscribe(hero => {
        setHero(hero);
        setHeroName(hero.name);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSave = (): void => {
    if (hero) {
      updateHero({ ...hero, name: heroName })
        .subscribe(() => handleBack());
    }
  };

  const handleBack = (): void => goBack();

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setHeroName(event.target.value);
  };

  if (hero) {
    return (
      <div>
        <h2>{hero.name.toUpperCase()} Details</h2>
        <div><span>id: </span>{hero.id}</div>
        <div>
          <label htmlFor={'hero-name'}>Hero name: </label>
          <input
            id={'hero-name'}
            value={heroName}
            placeholder={'Hero name'}
            onChange={handleChange}
          />
        </div>
        <button onClick={() => handleBack()}>go back</button>
        <button
          disabled={!heroName?.trim()}
          onClick={() => handleSave()}
        >
          save
        </button>
      </div>
    );
  }

  return <p>Loading...</p>;
};

export default HeroDetail;
