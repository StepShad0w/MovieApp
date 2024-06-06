import React from 'react'
import MainWindow from '../MainWindow'
import "./CSS/Trending.css"
import TopMenu from '../TopMenu'
import TrendingMovies from '../components/TrendingMovies'
export default function Trending() {
    return (
        <>
        <div className="main-wrapper">

        <div className="menu-windows">
    
        
        <div className="menu-window">
        <MainWindow></MainWindow>
        
    
        </div>
        <div className="main-div">
        <TopMenu ></TopMenu>
        <TrendingMovies></TrendingMovies>
    
    
    </div>
        </div>
        
        </div>
        </>
      )
    }
 