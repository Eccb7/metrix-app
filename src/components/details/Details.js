import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchGameDetails,
  selectSelectedGame,
} from '../../redux/details/detailsSlice';
import './details.css';

function DetailsPage() {
  const dispatch = useDispatch();
  const { gameId } = useParams();
  const selectedGame = useSelector(selectSelectedGame);

  useEffect(() => {
    dispatch(fetchGameDetails(gameId));
  }, [dispatch, gameId]);

  if (!selectedGame) {
    return <p className="loading">Loading...</p>;
  }

  return (
    <div className="details-container">
      <div className="details-header">
        <div className="details-flex">
          <img
            src={selectedGame.thumbnail}
            alt={selectedGame.title}
            className="game-image"
          />
          <article className="details-descript">
            <h1 className="game-title">{selectedGame.title}</h1>
            {gameId}
          </article>
        </div>
        <div className="details-slot">
          {selectedGame.title}
          {' '}
          Details
        </div>
        <p className="game-description">
          <b>Description:</b>
          <br />
          {' '}
          <i>{selectedGame.short_description}</i>
        </p>
        <table className="game-details-table">
          <tbody>
            <tr className="tables">
              <td className="game-property">Genre:</td>
              <td className="game-value">{selectedGame.genre}</td>
              <td>
                <Link to="/" className="detail-link">
                  <button type="button" className="detail-button">
                    <span className="material-icons">east</span>
                  </button>
                </Link>
              </td>
            </tr>
            <tr className="tables">
              <td className="game-property">Platform:</td>
              <td className="game-value">{selectedGame.platform}</td>
              <td>
                <Link to="/" className="detail-link">
                  <button type="button" className="detail-button">
                    <span className="material-icons">east</span>
                  </button>
                </Link>
              </td>
            </tr>
            <tr className="tables">
              <td className="game-property">Publisher:</td>
              <td className="game-value">{selectedGame.publisher}</td>
              <td>
                <Link to="/" className="detail-link">
                  <button type="button" className="detail-button">
                    <span className="material-icons">east</span>
                  </button>
                </Link>
              </td>
            </tr>
            <tr className="tables">
              <td className="game-property">Developer:</td>
              <td className="game-value">{selectedGame.developer}</td>
              <td>
                <Link to="/" className="detail-link">
                  <button type="button" className="detail-button">
                    <span className="material-icons">east</span>
                  </button>
                </Link>
              </td>
            </tr>
            <tr className="tables">
              <td className="game-property">Release Date:</td>
              <td className="game-value">{selectedGame.release_date}</td>
              <td>
                <Link to="/" className="detail-link">
                  <button type="button" className="detail-button">
                    <span className="material-icons">east</span>
                  </button>
                </Link>
              </td>
            </tr>
            <tr className="tables">
              <td className="game-property">Play Online:</td>
              <td className="game-value">
                <a href={selectedGame.game_url} target="_blank" rel="noreferrer">Click here</a>
              </td>
              <td>
                <Link to="/" className="detail-link">
                  <button type="button" className="detail-button">
                    <span className="material-icons">east</span>
                  </button>
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DetailsPage;
