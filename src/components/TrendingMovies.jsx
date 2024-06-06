
import React, { useEffect, useState } from 'react';
import "../pages/CSS/Movie.css";
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite, fetchMovies, selectMovies, fetchTrendingMovies } from './slices/MoviesSlicer';
import { FaCircleArrowRight } from "react-icons/fa6";
import { FaCircleArrowLeft } from "react-icons/fa6";
import Slider from "react-slick";

import MovieShow from './MovieShow';
import  settings  from '../components/Slider';

export default function Movie() {
    const dispatch = useDispatch();
    const trendingMovies =useSelector((state)=> state.movies.trendingMovies)
    
    console.log(trendingMovies,33333);
    useEffect(() => {
        dispatch(fetchTrendingMovies())
    }, [dispatch]);
    const [selectedMovie, setSelectedMovie] = useState(null);
  

  
    const handleMovieClick = (movie) => {
      setSelectedMovie(movie);
    };
  
    
  
   
    const movieToDisplay = selectedMovie || (trendingMovies.length > 0 ? trendingMovies[0] : null);
    
    return (
      <>
        <div className="page">
        <div className="trend">
        <div className='container'>
        <Slider {...settings}>
          {trendingMovies.map((movie, index) => (
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

        </div>
        {movieToDisplay && <MovieShow movie={movieToDisplay} />}
        </div>
      </>
    );
  }
