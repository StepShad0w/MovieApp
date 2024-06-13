import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../pages/CSS/MovieShow.css";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { selectFavorites,toggleFavorite } from './slices/MoviesSlicer';
export default function MovieShow({ movie, onClose }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const favorites = useSelector(selectFavorites);
    if (!movie) return null;
  
    const handleWatchNow = () => {
      navigate(`/watchnow/${movie.id}/`, { state: { movieId: movie.id } });
    };
    const isFavorite = (movie) => {
      return favorites.find(fav => fav.id === movie.id);
    };
    const handleFavoriteClick = (movie) => {
      dispatch(toggleFavorite(movie));
    };
    return (
      <div className="big-window-show">
        <div className="movie-form-show">
          <img className='main-image-show' src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title} />
          <div className="movie-info-sow">
           <div className="name-range">
           <h2 className='main-title-show'>{movie.title}</h2>
            <p className='range'>{Math.round(movie.vote_average*10)/10}/10</p>
           </div>
            <p>{movie.release_date}</p>
            <br></br>
            <p>{movie.overview}</p>
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