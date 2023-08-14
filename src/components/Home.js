import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchGames } from '../redux/game/gameSlice';

function HomePage() {
  const dispatch = useDispatch();
  const games = useSelector((state) => state.games.data);

  useEffect(() => {
    dispatch(fetchGames());
  }, [dispatch]);

  const categories = [
    'Shooter', 'Strategy', 'Racing', 'Sports', 'Social', 'MMO', 'MMOFPS', 'Fantasy', 'Fighting',
  ];

  const [selectedCategory, setSelectedCategory] = useState('');

  const filteredGames = selectedCategory
    ? games.filter((game) => game.genre === selectedCategory)
    : games;

  return (
    <div>
      <div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Genres</option>
          {categories.map((category) => (
            <option value={category} key={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div>
        {filteredGames.map((game) => (
          <div key={game.id}>
            <img src={game.image} alt={game.title} />
            <h2>{game.title}</h2>
            <p>
              Rating:
              {' '}
              {game.id}
              {' '}
              | Released:
              {' '}
              {game.releaseDate}
            </p>
            <Link to={`/details/${game.id}`}>
              Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
