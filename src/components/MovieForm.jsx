import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../pages/CSS/MovieForm.css";

export default function MovieForm({ movie, onClose }) {
  const navigate = useNavigate();

  if (!movie) return null;

  const handleWatchNow = () => {
    navigate(`/watchnow/${movie.id}`, { state: { movieId: movie.id } });
  };

  return (
    <div className="big-window">
      <div className="movie-form">
        <img className='main-image' src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.title} />
        <div className="movie-info">
          <h2 className='main-title'>{movie.title}</h2>
          <p>{movie.release_date}</p>
          <button className='watch-button' onClick={handleWatchNow}>Watch now</button>
        </div>
      </div>
    </div>
  );
}
