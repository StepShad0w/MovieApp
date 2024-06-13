import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite, fetchMovies, selectMovies, selectFavorites, selectFilteredMovies } from './slices/MoviesSlicer';
import Slider from "react-slick";
import MovieForm from './MovieForm';
import "../pages/CSS/Movie.css";
import settings from './Slider'; 
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Movie() {
  const dispatch = useDispatch();
  const movies = useSelector(selectMovies);
  const favorites = useSelector(selectFavorites);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const filteredMovies = useSelector(selectFilteredMovies);
  
  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      dispatch({ type: 'movies/loadFavorites', payload: JSON.parse(savedFavorites) });
    }
  }, [dispatch]);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleFavoriteClick = (movie) => {
    dispatch(toggleFavorite(movie));
  };

  const movieToDisplay = selectedMovie || (filteredMovies.length > 0 ? filteredMovies[0] : movies.length > 0 ? movies[0] : null);

  const isFavorite = (movie) => {
    return favorites.find(fav => fav.id === movie.id);
  };

  return (
    <>
      {movieToDisplay && <MovieForm movie={movieToDisplay} />}
      <div className='container'>
        <Slider {...settings}>
          {movies.map((movie, index) => (
            <div className='movie-element' key={index} onClick={() => handleMovieClick(movie)}>
              <div className='moviehid'>
                <img className='movies' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                <div className="favorite">
                  <div className="fav-fone" onClick={(e) => {
                      e.stopPropagation(); 
                      handleFavoriteClick(movie);
                    }}>
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
      </div>
    </>
  );
}
