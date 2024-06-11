import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite, fetchMovies, selectMovies, selectFavorites } from './slices/MoviesSlicer';
import Slider from "react-slick";
import MovieForm from './MovieForm';
import MovieShow from './MovieShow';
import "../pages/CSS/Movie.css";
import settings from './Slider'; // Import the settings
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const FavMovies = () => {
    const dispatch = useDispatch();
    const movies = useSelector(selectMovies);
    const favorites = useSelector(selectFavorites);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        dispatch(fetchMovies());
    }, [dispatch]);

    useEffect(() => {
        const savedFavorites = localStorage.getItem('favorites');
        const parsedMovie = JSON.parse(savedFavorites);
        console.log(savedFavorites, 1111);
        if (savedFavorites) {
            dispatch(toggleFavorite(parsedMovie));
        }
    }, []);

    const handleMovieClick = (movie) => {
        setSelectedMovie(movie);
    };

    const handleFavoriteClick = (movie) => {
        dispatch(toggleFavorite(movie));
    };

    const movieToDisplay = selectedMovie || (movies.length > 0 ? movies[0] : null);

    const isFavorite = (movie) => {
        return favorites.find(fav => fav.id === movie.id);
    };

    return (
        <>
            <div className="page">
                <div className="trend">
                    <div className='container'>
                        <Slider {...settings}>
                            {favorites.map((movie) => (
                                <div className='movie-element' key={movie.id} onClick={() => handleMovieClick(movie)}>
                                    <div className='moviehid'>
                                        <img className='movies' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                                        <div className="favorite">
                                            <div className="fav-fone" onClick={(e) => {
                                                e.stopPropagation();
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
                <div className="padding">
                    {movieToDisplay && <MovieShow movie={movieToDisplay} />}
                </div>
            </div>
        </>
    );
};

export default FavMovies;
