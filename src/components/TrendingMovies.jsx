
import React, { useEffect, useState } from 'react';
import "../pages/CSS/Movie.css";
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite, fetchMovies, selectMovies, fetchTrendingMovies,selectFavorites } from './slices/MoviesSlicer';
import { FaCircleArrowRight } from "react-icons/fa6";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import Slider from "react-slick";

import MovieShow from './MovieShow';
import  settings  from '../components/Slider';

export default function Movie() {
    const dispatch = useDispatch();
    const trendingMovies =useSelector((state)=> state.movies.trendingMovies)
    const favorites = useSelector(selectFavorites);
    console.log(trendingMovies,33333);
    useEffect(() => {
        dispatch(fetchTrendingMovies())
    }, [dispatch]);
    const [selectedMovie, setSelectedMovie] = useState(null);
  

  
    const handleMovieClick = (movie) => {
      setSelectedMovie(movie);
    };
  
    
    const handleFavoriteClick = (movie) => {
      dispatch(toggleFavorite(movie));
    };
   
    const movieToDisplay = selectedMovie || (trendingMovies.length > 0 ? trendingMovies[0] : null);
    const isFavorite = (movie) => {
      return favorites.find(fav => fav.id === movie.id);
    };
    return (
      <>
        <div className="page">
        <div className="trend">
        <div className='container'>
        <Slider {...settings}>
          {trendingMovies.map((movie, index) => (
            <div className='movie-element' key={index} onClick={() => handleMovieClick(movie)}>
              <div className="moviehid">

              <img className='movies' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
              <div className="favorite">
                  <div className="fav-fone" onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the parent click event
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

        </div>
        {movieToDisplay && <MovieShow movie={movieToDisplay} />}
        </div>
      </>
    );
  }
