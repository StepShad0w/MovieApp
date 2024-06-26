import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite, fetchMovies, selectMovies, selectFavorites, selectFilteredMovies } from './slices/MoviesSlicer';
import Slider from "react-slick";
import MovieForm from './MovieForm';
import "../pages/CSS/Movie.css";
import settingsMovies from './Slider';
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from 'react-router-dom';

export default function Movie() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const movies = useSelector(selectMovies);
  const favorites = useSelector(selectFavorites);
  
  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      dispatch({ type: 'movies/loadFavorites', payload: JSON.parse(savedFavorites) });
    }
  }, [dispatch]);

  const handleWatchNow = (movie) => {
    navigate(`/watchnow/${movie.id}`, { state: { movieId: movie.id } });
  };

  const handleFavoriteClick = (movie, e) => {
    e.stopPropagation();
    dispatch(toggleFavorite(movie));
  };

  const isFavorite = (movie) => {
    return favorites.some(fav => fav.id === movie.id);
  };


  return (
    <>
      <div className='container'>
        {movies.length > 0 ? (
          <Slider {...settingsMovies}>
            {movies.map((movie, index) => (
              <div className='movie-element' key={index} onClick={() => handleWatchNow(movie)}>
                <div className='moviehid'>
                  <img className='movies' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                  <div className="favorite">
                    <div className="fav-fone" onClick={(e) => handleFavoriteClick(movie, e)}>
                      {isFavorite(movie) ? <MdFavorite className='favorite-button' /> : <MdFavoriteBorder className='favorite-button' />}
                    </div>
                  </div>
                </div>
                <div className='description'>
                  <div className='title'>{movie.title}</div>
                  <div className='year-data'>{movie.release_date}</div>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <p>No movies available.</p>
        )}
      </div>
    </>
  );
}
