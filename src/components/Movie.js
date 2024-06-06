import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite, fetchMovies, selectMovies } from './slices/MoviesSlicer';
import Slider from "react-slick";
import MovieForm from './MovieForm';
import "../pages/CSS/Movie.css";
import settings from '../components/Slider'; // Import the settings

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default function Movie() {
  const dispatch = useDispatch();
  const movies = useSelector(selectMovies);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const movieToDisplay = selectedMovie || (movies.length > 0 ? movies[0] : null);

  return (
    <>
      {movieToDisplay && <MovieForm movie={movieToDisplay} />}
      <div className='container'>
        <Slider {...settings}>
          {movies.map((movie, index) => (
            <div className='movie-element' key={index} onClick={() => handleMovieClick(movie)}>
              <img className='movies' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
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
