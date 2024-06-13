import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../pages/CSS/MovieForm.css";
import Slider from "react-slick";
import settings from './BigSlider'; 
import { useDispatch, useSelector } from 'react-redux';
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

import { selectFavorites, toggleFavorite,selectMovies } from './slices/MoviesSlicer';

export default function MovieForm( ) {
  const navigate = useNavigate();
  const favorites = useSelector(selectFavorites);
  const dispatch = useDispatch();
  const movies = useSelector(selectMovies);
  const handleWatchNow = (movieId) => {
    navigate(`/watchnow/${movieId}`, { state: { movieId: movieId } });
  };

  const isFavorite = (movie) => {
    return favorites.find(fav => fav.id === movie.id);
  };

  const handleFavoriteClick = (e, movie) => {
    e.stopPropagation(); // Prevent triggering the parent click event
    dispatch(toggleFavorite(movie));
  };

  return (
    <div className="big-window">
      <div className="movie-form">
        <Slider {...settings}>
          {movies && movies.map((movie, index) => (
            <div className='movie-elemen' key={index}>
              <img className='main-image' src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title} />
              <div className="movie-info">
                <h2 className='main-title'>{movie.title}</h2>
                <p>{movie.release_date}</p>
                <div className="watch-but">
                  <button className='watch-button' onClick={() => handleWatchNow(movie.id)}>Watch now</button>
                  <div className="favorite-main">
                    <div className="fav-fone-main" onClick={(e) => handleFavoriteClick(e, movie)}>
                      {isFavorite(movie) ? <MdFavorite className='favorite-button' /> : <MdFavoriteBorder className='favorite-button' />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
