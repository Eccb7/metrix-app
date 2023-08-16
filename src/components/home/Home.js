import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import { fetchGames } from '../../redux/game/gameSlice';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './home.css';

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

  const genreCounts = categories.reduce((countMap, category) => ({
    ...countMap,
    [category]:
    games.filter((game) => game.genre === category).length,
  }), {});

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
      <div className="carousel-container">
        <Carousel showArrows showStatus showThumbs={false}>
          {filteredGames.slice(0, 9).map((game) => (
            <div className="carousel-item" key={game.id}>
              <div className="carousel-item-info">
                <div className="carousel-item-info-text">
                  <h2>
                    {game.genre}
                    <br />
                    <span className="genre-game-count">
                      {genreCounts[game.genre]}
                      {' '}
                      games
                    </span>
                  </h2>
                  <p>
                    {game.description}
                  </p>
                  {' '}
                </div>
                <img src={game.image} alt={game.title} className="carousel-item-image" />
              </div>
            </div>
          ))}
        </Carousel>
      </div>
      <div className="stats">
        Stats by games
      </div>
      <div className="games-container">
        {filteredGames.map((game) => (
          <div className="game-card" key={game.id}>
            <div className="game-details">
              <Link to={`/details/${game.id}`} className="details-link">
                <button type="button" className="details-button">
                  <span className="material-icons">east</span>
                </button>
              </Link>
            </div>
            <img src={game.image} alt={game.title} />
            <h2>{game.title}</h2>
            <div className="game-info">
              <p>
                {' '}
                {game.id}
                {' '}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
