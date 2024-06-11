import React, { useEffect, useState } from 'react';
import "../pages/CSS/Movie.css";
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite, fetchMovies, selectMovies, fetchUpcomingMovies,selectUpcomingMovies, selectFavorites } from './slices/MoviesSlicer';
import { FaCircleArrowRight } from "react-icons/fa6";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import MovieShow from './MovieShow';
import SimpleSlider from './Slider';
import Slider from 'react-slick';
import  settings  from '../components/Slider';
export default function UpComongMovies() {
  const dispatch = useDispatch();
  const upcomingMovies =useSelector(selectUpcomingMovies)
  const favorites = useSelector(selectFavorites);
  console.log(upcomingMovies,33333);
  useEffect(() => {
      dispatch(fetchUpcomingMovies())
  }, [dispatch]);
  const [selectedMovie, setSelectedMovie] = useState(null);



  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };
  const handleFavoriteClick = (movie) => {
    dispatch(toggleFavorite(movie));
  };
 

  const movieToDisplay = selectedMovie || (upcomingMovies.length > 0 ? upcomingMovies[0] : null);
  const isFavorite = (movie) => {
    return favorites.find(fav => fav.id === movie.id);
  };
    return (
        <>
         <div className="page">
        <div className="trend">
        <div className='container'>
          
          <div className='gallery'>
            <Slider {...settings}>
            {upcomingMovies.map((movie, index) => (
               <div className='movie-element' key={index} onClick={() => handleMovieClick(movie)}>
               <div className='moviehid'>
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

        </div>
        {movieToDisplay && <MovieShow movie={movieToDisplay} />}
        </div>
        </>

    )
}


