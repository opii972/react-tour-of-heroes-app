import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import HeroSearch from '../HeroSearch/HeroSearch';
import { HeroContext } from '../InMemoryHeroContextProvider';
import { Hero } from '../hero';

import './Dashboard.scoped.css'

const Dashboard = () => {
  const { getHeroes } = useContext(HeroContext);
  const [heroes, setHeroes] = useState<Hero[]>([]);

  useEffect(() => {
    getHeroes().subscribe(heroes => setHeroes(heroes));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (<>
    <h2>Top Heroes</h2>
    <div className={'heroes-menu'}>
      {heroes
        .slice(1, 5)
        .map(({ id, name }) => (
          <Link key={id} to={`/detail/${id}`}>{name}</Link>
        ))}
    </div>

    <HeroSearch />
  </>);
};

export default Dashboard;
