// SearchModal.js
import React from 'react';
import './SearchModal.css';

const SearchModal = ({ show, filmName, searchType, correctMovies, correctPeople, handleFilmClick, handlePersonClick }) => {
  if (!show) return null;

  return (
    <div className="search-modal">
      {filmName.length !== 0 ? (
        searchType === 'movies' ? (
          correctMovies.map((movie) => (
            <div key={movie.id} className="movie-item" onClick={() => handleFilmClick(movie)}>
              <div className="find">
                <img className='movies-find' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                <div className="desk">
                  <p className='movie-list-in'>{movie.title}</p>
                  <p className='date'>{movie.release_date}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          correctPeople.map((person) => (
            <div key={person.id} className="movie-item" onClick={() => handlePersonClick(person)}>
              <div className="find">
                <img className='movies-find' src={`https://image.tmdb.org/t/p/w200${person.profile_path}`} alt={person.name} />
                <div className="desk">
                  <p className='movie-list-in'>{person.name}</p>
                  <p className='known-for'>
                    {person.known_for.map((film, index) => (
                      <span key={index}>{film.title || film.name}{index < person.known_for.length - 1 ? ', ' : ''}</span>
                    ))}
                  </p>
                  <p>popularity:{person.popularity}</p>
                </div>
              </div>
            </div>
          ))
        )
      ) : null}
    </div>
  );
};

export default SearchModal;
