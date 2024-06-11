import React from 'react'
import MainWindow from '../MainWindow'
import "./CSS/Home.css"
import TopMenu from '../TopMenu'
import Movie from '../components/Movie'
import MovieForm from '../components/MovieForm'
import FavMovies from '../components/FavMovies'

const Favourites = () => {
  return(
  <div className="main-wrapper">
     
<div className="menu-windows">

 
<div className="menu-window">
<MainWindow></MainWindow>


</div>
<div className="main-div">
<TopMenu ></TopMenu>
<MovieForm></MovieForm>
<div className="rand-movies">

<FavMovies></FavMovies>
</div>
</div>
</div>


</div>
  )
}

export default Favourites;
