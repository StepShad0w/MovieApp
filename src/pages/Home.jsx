import React from 'react'
import MainWindow from '../MainWindow'
import "./CSS/Home.css"
import TopMenu from '../TopMenu'
import Movie from '../components/Movie'
import MovieForm from '../components/MovieForm'
export default function Home() {
  return (
    <>
      <div className="main-wrapper">
        <div className="menu-windows">
          <div className="menu-window">
            <MainWindow />
          </div>
          <div className="main-div">
            <TopMenu />
            <MovieForm />
            <div className="rand-movies">
              <Movie />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
