import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../pages/CSS/MovieForm.css";
import { useDispatch, useSelector } from 'react-redux';
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

import { selectFavorites,toggleFavorite } from './slices/MoviesSlicer';

export default function MovieForm({ movie, onClose }) {
  const navigate = useNavigate();
  const favorites = useSelector(selectFavorites);
  const dispatch = useDispatch();
  if (!movie) return null;

  const handleWatchNow = () => {
    navigate(`/watchnow/${movie.id}`, { state: { movieId: movie.id } });
  };
  const isFavorite = (movie) => {
    return favorites.find(fav => fav.id === movie.id);
  };
  const handleFavoriteClick = (movie) => {
    dispatch(toggleFavorite(movie));
  };


  return (
    <div className="big-window">
      <div className="movie-form">
        <img className='main-image' src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title} />
        <div className="movie-info">
          <h2 className='main-title'>{movie.title}</h2>
          <p>{movie.release_date}</p>
          <div className="watch-but">
          <button className='watch-button' onClick={handleWatchNow}>Watch now</button>
          <div className="favorite-main">
                  <div className="fav-fone-main" onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the parent click event
                      handleFavoriteClick(movie);
                    }}>
                    {isFavorite(movie) ? <MdFavorite className='favorite-button' /> : <MdFavoriteBorder className='favorite-button' />}
                  </div>
                </div>
          </div>
        </div>
      </div>
    </div>
  );
}
