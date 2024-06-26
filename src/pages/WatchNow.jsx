import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import YouTube from 'react-youtube';
import Slider from "react-slick";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { FaImdb } from "react-icons/fa";
import MainWindow from '../MainWindow';
import TopMenu from '../TopMenu';
import { useNavigate } from 'react-router-dom';
import "./CSS/WatchNow.css";
import settingsMovies from '../components/Slider';
import settings from '../components/SliderForMany';
import { fetchMovieById,toggleFavorite,selectFavorites, fetchVideo, selectTrailerById, fetchImagesById, selectMoviesImagesById, fetchSimilar, selectSimilarMovies } from '../components/slices/MoviesSlicer';


const Modal = ({ imgSrc, onClose }) => (
  <div className="modal" onClick={onClose}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <img src={imgSrc} alt="full-size" className="full-size-image" />
      {/* <button onClick={onClose} className="close-button">Close</button> */}
    </div>
  </div>
);


export default function WatchNow() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { id: routeId } = useParams();
  const movieId = location.state?.movieId || routeId;
  const favorites = useSelector(selectFavorites);
  const movieById = useSelector((state) => state.movies.movieById);
  const trailerById = useSelector(selectTrailerById);
  const similarMovies = useSelector((state) => state.movies.similarMovies);
  const imagesById = useSelector((state) => state.movies.imagesById);


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImgSrc, setModalImgSrc] = useState('');

  const openModal = (imgSrc) => {
    setModalImgSrc(imgSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImgSrc('');
  };


  const handleWatchNow = (movie) => {
    navigate(`/watchnow/${movie.id}`, { state: { movieId: movie.id } });
  };
  const handleFavoriteClick = (movie, e) => {
    e.stopPropagation();
    dispatch(toggleFavorite(movie));
  };
  const isFavorite = (movie) => {
    return favorites.some(fav => fav.id === movie.id);
  };


  useEffect(() => {
    if (movieId) {
      dispatch(fetchVideo(movieId));
      dispatch(fetchMovieById(movieId));
      dispatch(fetchSimilar(movieId));
      dispatch(fetchImagesById(movieId));
    }
  }, [movieId, dispatch]);
const handle = (imagesById)=>{
  return(
    <img className='modal-photo' src={"https://image.tmdb.org/t/p/w400" + imagesById?.file_path}  alt="" />
  )
}
  return (
    <>
      <div className="main-wrapper">
        <div className="menu-windows">
          <div className="menu-window">
            <MainWindow />
          </div>
          <div className="main-div">
            <TopMenu />
            <div className="watch-now">
              <div className="video-and-information">
                {movieById ? (
                  <>
                    <img src={`https://image.tmdb.org/t/p/w500${movieById.poster_path}`} alt={movieById.title} />
                    <div className="information">
                      <div className="info-block">
                        <p className='details'>Name:</p>
                        <h2 className='h2'>{movieById.title}</h2>
                      </div>
                      <div className="info-block">
                        <p className='details'>Date:</p>
                        <h2 className='h2'>{movieById.release_date}</h2>
                      </div>
                      <div className="info-block">
                        <p className='details'>Rating IMDb:</p>
                        <h2 className='h2'>{Math.round(movieById.vote_average * 10) / 10}/10 <FaImdb className='imdb' /></h2>
                      </div>
                      <div className="info-block">
                        <p className='details'>Rating:</p>
                        <h2 className='h2'>{movieById.popularity}</h2>
                      </div>
                    </div>
                  </>
                ) : (
                  <p>Loading movie information...</p>
                )}
              </div>
              {movieById && (
                <div className="description-text">
                  <p className='h3'>{movieById.overview}</p>
                </div>
              )}
              <div className="images-box">
                <div className="person-images">
                <Slider {...settings}>
                  {imagesById?.map((img, index) => (
                    <div className="mov-img" key={index} onClick={() => openModal("https://image.tmdb.org/t/p/original" + img.file_path)}>
                      <img className='img' src={"https://image.tmdb.org/t/p/w200" + img.file_path} alt="movie" />
                    </div>
                  ))}
                </Slider>
                </div>
              </div>
              <div className="video-box">
                {trailerById ? (
                  <div className="video">
                    <YouTube className='vid' videoId={trailerById.key} />
                  </div>
                ) : (
                  <p>Loading video...</p>
                )}
              </div>
            </div>
            <p className='similar'>Similar Movies</p>
            <div className='container'>
        {similarMovies.length > 0 ? (
          <Slider {...settingsMovies}>
            {similarMovies.map((movie, index) => (
              <div className='movie-element' key={index} onClick={() => handleWatchNow(movie)}>
                <div className='moviehid'>
                  <img className='movies' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                  <div className="favorite">
                    <div className="fav-fone" onClick={(e) => handleFavoriteClick(movie, e)}>
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
        ) : (
          <p>No movies available.</p>
        )}
      </div>
          </div>
        </div>
        {isModalOpen && <Modal imgSrc={modalImgSrc} onClose={closeModal} />}
      </div>
    </>
  );
}
