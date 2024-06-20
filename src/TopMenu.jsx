import React, { useState, useEffect, useRef } from 'react';
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { LuBell } from "react-icons/lu";
import "./TopMenu.css";
import AuthDeteils from './components/AuthDeteils';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilteredMovies, selectFilteredPeople, fetchSearchPeople, fetchSearch } from './components/slices/MoviesSlicer';

const TopMenu = () => {
  const [showInput, setShowInput] = useState(false);
  const [filmName, setFilmName] = useState('');
  const [timer, setTimer] = useState(null);
  const [searchType, setSearchType] = useState('movies');
  const filteredMovies = useSelector(selectFilteredMovies);
  const filteredPeople = useSelector(selectFilteredPeople);
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
      if (searchType === 'movies') {
        dispatch(fetchSearch(value.trim()));
      } else if (searchType === 'people') {
        dispatch(fetchSearchPeople(value.trim()));
      }
    }, 500));
  };

  const handleFilmClick = (movie) => {
    navigate(`/watchnow/${movie.id}`, { state: { movieId: movie.id } });
  };

  const handlePersonClick = (person) => {
    navigate(`/person/${person.id}`, { state: { personId: person.id } });
  };

  const [newInput, setNewInput] = useState("hideinput");
  const [radio, setRadio] = useState('hide-radio')
  const [lupa, setLupa] = useState("white-lupa");
  const handleInput = () => {
    setRadio((prevInput) => (prevInput === "hide-radio" ? "show-radio" : "hide-radio"))
    setShowInput(!showInput);
    setNewInput((prevInput) => (prevInput === "hideinput" ? "showinput" : "hideinput"));
    setFilmName('');
    setNewModal((prevInput) => (prevInput === "hide-modal" ? "movie-list" : "hide-modal"));
    setLupa((prevInput) => (prevInput === "white-lupa" ? "lupa" : "white-lupa"));
  };

  const [newModal, setNewModal] = useState("hide-modal");

  const handleModal = () => {
    setNewModal("movie-list");
  };

  const uniqueMovies = Array.from(new Set(filteredMovies.map((movie) => movie.id)))
    .map((id) => filteredMovies.find((movie) => movie.id === id));
  const correctMovies = uniqueMovies.filter(movie => movie.poster_path);

  const uniquePeople = Array.from(new Set(filteredPeople.map((person) => person.id)))
    .map((id) => filteredPeople.find((person) => person.id === id));
  const correctPeople = uniquePeople.filter(person => person.profile_path);
console.log(correctPeople,333);
  return (
    <div className="menutop">
      <div className="left-row">
        <NavLink to='/Coming' className="navLink">Movies</NavLink>
        <p>Series</p>
        <p>Documentaries</p>
      </div>
      <div className="right-row">
          <div className="input-plus-optional">
        <div className={newModal}>
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
        
        <input
          className={newInput}
          ref={inputRef}
          onChange={(e) => handleInputChange(e.target.value)}
          value={filmName}
          onClick={handleModal}
          placeholder="Search for movies or people..."
        />
        <div className={radio}>
          <label>
            <input
              type="radio"
              name="searchType"
              value="movies"
              checked={searchType === 'movies'}
              onChange={() => setSearchType('movies')}
            />
            Movies
          </label>
          <label>
            <input
              type="radio"
              name="searchType"
              value="people"
              checked={searchType === 'people'}
              onChange={() => setSearchType('people')}
            />
            People
          </label>
        </div>
        <HiOutlineMagnifyingGlass onClick={handleInput} className={`icon ${lupa}`} />
        </div>
        <LuBell className='icon' />
        <div className="acount">
          <p><AuthDeteils /></p>
        </div>
      </div>
    </div>
  );
};

export default TopMenu;
