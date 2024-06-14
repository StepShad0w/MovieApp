import React, { useState, useEffect, useRef } from 'react';
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { LuBell } from "react-icons/lu";
import "./TopMenu.css";
import AuthDeteils from './components/AuthDeteils';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilteredMovies, fetchSearch } from './components/slices/MoviesSlicer';

const TopMenu = () => {
  const [showInput, setShowInput] = useState(false);
  const [filmName, setFilmName] = useState('');
  const [timer, setTimer] = useState(null);
  const filteredMovies = useSelector(selectFilteredMovies);
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showInput]);

  const handleInputChange = (value) => {
    setFilmName(value);
    clearTimeout(timer);
    setTimer(setTimeout(() => {
      dispatch(fetchSearch(value.trim()));
    }, 500));
  };

  const handleFilmClick = (movie) => {
    navigate(`/watchnow/${movie.id}`, { state: { movieId: movie.id } });
  };
  
  const [newInput, setNewInput] = useState("hideinput");
const [lupa, setLupa]= useState("white-lupa")
  const handleInput = () => {
    setShowInput(!showInput);
    setNewInput((prevInput) => (prevInput === "hideinput" ? "showinput" : "hideinput"));
    setFilmName('');
    // setNewModal("hide-modal")
    setNewModal((prevInput) => (prevInput === "hide-modal" ? "movie-list" : "hide-modal"));
    setLupa((prevInput) => (prevInput === "white-lupa" ? "lupa" : "white-lupa"));
  };
  
  const [newModal, setNewModal] = useState("hide-modal");

  const handleModal = () => {
    setNewModal("movie-list");
  };
  
  const uniqueMovies = Array.from(new Set(filteredMovies.map((movie) => movie.id)))
    .map((id) => filteredMovies.find((movie) => movie.id === id));
  const correct = uniqueMovies.filter(movie => movie.poster_path);

  return (
    <div className="menutop">
      <div className="left-row">
        <NavLink to='/Coming' className="navLink">Movies</NavLink>
        <p>Series</p>
        <p>Documentaries</p>
      </div>
      <div className="right-row">
        <div className={newModal}>
          {filmName.length !==0?(
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
          ):null}
        </div>
          
        <input
          className={newInput}
          ref={inputRef}
          onChange={(e) => handleInputChange(e.target.value)}
          value={filmName}
          onClick={handleModal}
          placeholder="Search for movies..."
        />
        
        <HiOutlineMagnifyingGlass onClick={handleInput} className= {`icon ${lupa} `}  />
        <LuBell className='icon' />
        <div className="acount">
          <p><AuthDeteils /></p>
        </div>
      </div>
    </div>
  );
};

export default TopMenu;
