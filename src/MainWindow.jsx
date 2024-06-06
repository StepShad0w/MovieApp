import React from 'react'
import "./MainWindow.css"
import { BiFilm } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";
import { LuCalendar } from "react-icons/lu";
import { GoPeople } from "react-icons/go";
import { IoChatbubbleOutline } from "react-icons/io5";
import { GiSettingsKnobs } from "react-icons/gi";
import { LuLogOut } from "react-icons/lu";
import { BiSolidCoffee } from "react-icons/bi";
import { NavLink } from 'react-router-dom'
export default function MainWindow() {
  return (
    <>
    <div className="menu">
        <div className="watch">
        <BiSolidCoffee className='icon-big' />
        <h2><strong>watch</strong></h2>
        </div>
        <div className="mainMenu">
            <div className="element">
            <BiFilm className='icon' />
            <NavLink to='/Home' className="navLink" > Home</NavLink>
            </div>
            <div className="element">
            <FaRegHeart className='icon' />
            <NavLink to='/Favourites'  className="navLink"> Favourites</NavLink>
                
            </div>
            <div className="element">
            <FaArrowTrendUp className='icon' />
            <NavLink to='/Trending' className="navLink" > Tranding</NavLink>
            </div>
            <div className="element">
            <LuCalendar className='icon' />
            <NavLink to='/Coming' className="navLink" > Coming soon</NavLink>
                
            </div>
        </div>
        <div className="comm">
            <div className="element">
            <GoPeople className='icon' />
                <p>Community</p>
            </div>
            <div className="element">
            <IoChatbubbleOutline className='icon' />
                <p>Social</p>
            </div>
        </div>
        <div className="addmenu">
            <div className="element">
            <GiSettingsKnobs className='icon' />
                <p>Setting</p>
            </div>
            <div className="element">
            <LuLogOut className='icon' />
                <p>Logout</p>
            </div>
        </div>
    </div>
    </>
  )
}
