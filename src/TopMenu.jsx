import React, { useState, useEffect } from 'react';
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { LuBell } from "react-icons/lu";
import "./TopMenu.css";
import AuthDeteils from './components/AuthDeteils';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilteredMovies, fetchSearch } from './components/slices/MoviesSlicer';

const Modal = ({ show, handleClose, filmName, setFilmName, filteredMovies }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [timer, setTimer] = useState(null);
  

  if (!show) return null;

  const handleInputChange = (value) => {
    setFilmName(value);
    clearTimeout(timer);
    setTimer(setTimeout(() => {
      dispatch(fetchSearch(value.trim())); 
    }, 800)); 
  };

  const handleFilmClick = (movie) => {
    navigate(`/watchnow/${movie.id}`, { state: { movieId: movie.id } });
  };

  const uniqueMovies = Array.from(new Set(filteredMovies.map((movie) => movie.id)))
    .map((id) => filteredMovies.find((movie) => movie.id === id));
  const correct = uniqueMovies.filter(movie => movie.poster_path);

  return (
    <div className={`modal ${show ? 'active' : ''}`} onClick={handleClose}>
      <div className="modal-content-find" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={handleClose}>&times;</span>
        <input
          className="modal-input"
          onChange={(e) => handleInputChange(e.target.value)}
          value={filmName}
          placeholder="Search for movies..."
        />
        <div className="movie-list">
          {correct.length > 0 ? (
            correct.map((movie) => (
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
            <p></p>
          )}
        </div>
      </div>
    </div>
  );
};

const TopMenu = () => {
  const [showModal, setShowModal] = useState(false);
  const [filmName, setFilmName] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const filteredMovies = useSelector(selectFilteredMovies);

  const handleLoopClick = () => {
    setShowModal(!showModal);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFilmName('');
  };

  return (
    <>
      <div className="menutop" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <section className={`whatwesee ${isHovered ? 'active' : ''}`}>
          <div className="left-row">
            <NavLink to='/Coming' className="navLink">Movies</NavLink>
            <p>Series</p>
            <p>Documentaries</p>
          </div>
          <div className="right-row">
            <HiOutlineMagnifyingGlass onClick={handleLoopClick} className='icon' />
            <LuBell className='icon' />
            <div className="acount">
              <p><AuthDeteils /></p>
            </div>
          </div>
        </section>
        <section className='whatwedont'></section>
        <Modal
          show={showModal}
          handleClose={handleCloseModal}
          filmName={filmName}
          setFilmName={setFilmName}
          filteredMovies={filteredMovies}
        />
      </div>
    </>
  );
};

export default TopMenu;
