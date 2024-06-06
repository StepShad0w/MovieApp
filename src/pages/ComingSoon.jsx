import React from 'react'
import MainWindow from '../MainWindow'
import "./CSS/ComingSoon.css"
import TopMenu from '../TopMenu'
import UpComongMovies from '../components/UpComongMovies'
export default function ComingSoon() {
  return (
    <>
    <div className="main-wrapper">

    <div className="menu-windows">

    
    <div className="menu-window">
    <MainWindow></MainWindow>
    
   

    </div>
    <div className="main-div">
    <TopMenu ></TopMenu>
    <UpComongMovies></UpComongMovies>
    
    
    </div>
    
    </div>
    
    </div>
    </>
  )
}
