import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGameDetails, selectSelectedGame } from '../redux/details/detailsSlice';

function DetailsPage() {
  const dispatch = useDispatch();
  const { gameId } = useParams();
  const selectedGame = useSelector(selectSelectedGame);

  useEffect(() => {
    dispatch(fetchGameDetails(gameId));
  }, [dispatch, gameId]);

  if (!selectedGame) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <img src={selectedGame.thumbnail} alt={selectedGame.title} />
      <h2>{selectedGame.title}</h2>
      <p>
        Genre:
        {' '}
        {selectedGame.genre}
        <br />
        Platform:
        {' '}
        {selectedGame.platform}
        <br />
        Publisher:
        {' '}
        {selectedGame.publisher}
        <br />
        Developer:
        {' '}
        {selectedGame.developer}
        <br />
        Release Date:
        {' '}
        {selectedGame.release_date}
      </p>
      <p>
        Description:
        {' '}
        {selectedGame.short_description}
      </p>
      <Link to="/">
        <button type="submit">Back to Home</button>
      </Link>
    </div>
  );
}

export default DetailsPage;
