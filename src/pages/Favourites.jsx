import React from 'react'
import MainWindow from '../MainWindow'
import "./CSS/Favourites.css"
import TopMenu from '../TopMenu'
import Peoples from '../components/Peoples'
import SimpleSlider from '../components/Slider'
export default function Favourites() {
  return (
    <>
    <div className="main-wrapper">

     <div className="menu-windows">

    
    <div className="menu-window">
    <MainWindow></MainWindow>
    

    </div>
    <div className="main-div">
    <TopMenu ></TopMenu>
   
    <SimpleSlider></SimpleSlider>
    
    </div>
    </div>
    
    </div>
    </>
  )
}