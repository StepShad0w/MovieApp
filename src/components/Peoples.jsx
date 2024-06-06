import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularMovies, selectPeoples, selectPopularMovies } from './slices/MoviesSlicer';

export default function Peoples() {
    const dispatch = useDispatch();
  const location = useLocation();
  const movieId = location.state?.movieId;
  const popularMovies = useSelector(selectPopularMovies)

  console.log(popularMovies,321321);
  const {id} = useParams()
  console.log(id)
  
  

  useEffect(() => {
    
      dispatch(fetchPopularMovies())
    
  }, [dispatch]);

  return (
    <div>Peoples</div>
  )
}
