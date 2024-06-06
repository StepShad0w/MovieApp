import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../pages/CSS/MovieShow.css";
export default function MovieShow({ movie, onClose }) {
    const navigate = useNavigate();

    if (!movie) return null;
  
    const handleWatchNow = () => {
      navigate(`/watchnow/${movie.id}/`, { state: { movieId: movie.id } });
    };
  
    return (
      <div className="big-window-show">
        <div className="movie-form-show">
          <img className='main-image-show' src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.title} />
          <div className="movie-info-sow">
           <div className="name-range">
           <h2 className='main-title-show'>{movie.title}</h2>
            <p className='range'>{Math.round(movie.vote_average*10)/10}/10</p>
           </div>
            <p>{movie.release_date}</p>
            <br></br>
            <p>{movie.overview}</p>
            <button className='watch-button' onClick={handleWatchNow}>Watch now</button>
          </div>
        </div>
      </div>
    );
  }