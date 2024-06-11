import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import YouTube from 'react-youtube';
import { FaImdb } from "react-icons/fa";
import MainWindow from '../MainWindow';
import TopMenu from '../TopMenu';
import "./CSS/WatchNow.css";
import MoviesSlicer, { fetchMovieById, fetchVideo, getMovieById, selectTrailerById, fetchImagesById } from '../components/slices/MoviesSlicer';

export default function WatchNow() {
  const dispatch = useDispatch();
  const location = useLocation();
  const movieId = location.state?.movieId;
  const movieById = useSelector((state) => state.movies.movieById)
  const trailerById = useSelector(selectTrailerById)

  const imagesById = useSelector((state)=>state.movies.imagesById)

  console.log(trailerById,321321);
  const {id} = useParams()
  console.log(id)
  
  

  useEffect(() => {
    if (movieId) {
      dispatch(fetchVideo(movieId))
      dispatch(fetchMovieById(id))
      dispatch(fetchImagesById(id))
    }
  }, [movieId]);
  console.log(imagesById, 2223)

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
                    <h2 className='h2'> {movieById.release_date}</h2>
                    </div>
                    
                    <div className="info-block">
                    <p className='details'>Rating IMDb:</p>
                    <h2 className='h2'> {Math.round(movieById.vote_average*10)/10}/10 <FaImdb  className='imdb'/></h2>
                    </div>
                    
                    <div className="info-block">
                    <p className='details'>Rating:</p>
                    <h2 className='h2'> {movieById.popularity}</h2>
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
            <div className="video-box">
              {trailerById ? (
                
                <div className="0video">
                  <YouTube className='vid' videoId={trailerById.key} />
                </div>
              ) : (
                <p>Loading video...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
