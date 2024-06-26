import React, { useState } from 'react'
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
import { SignOut } from './components/SignOut'; // Перейменування з SignOut на signOut
import { useNavigate } from 'react-router-dom'
import { set } from 'firebase/database';
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";


export default function MainWindow() {
    const navigate = useNavigate();
    const [show, setShow]= useState('bar-menu')
    const [watch, setWatch]= useState('watch')
    const [text, setText]= useState('navLink')
    const [menu, setMenu]= useState('menu')
    const [row, setRow] = useState('row')
    const handleSignOut = () => {
        SignOut().then(() => {
            navigate('/');
        }).catch((error) => {
            console.error('Sign out error:', error)
        });
    }
const handleHide=()=>{
    setShow((prevShow) => (prevShow === "bar-menu" ? "hide-menu" : "bar-menu"));
    setWatch((prevShow) => (prevShow === "watch" ? "nowatch" : "watch"));
    setText((prevShow) => (prevShow === "navLink" ? "notext" : "navLink"));
    setMenu((prevShow) => (prevShow === "menu" ? "min-menu" : "menu"));
    setRow((prevShow) => (prevShow === "row" ? "row-right" : "row"));
}
    return (
        <>
            <div className={menu}>
                <div className={row} onClick={handleHide}>
                    <p>{row =="row" && <FaArrowAltCircleLeft></FaArrowAltCircleLeft>}</p>
                    <p>{row =="row-right" && <FaArrowAltCircleRight></FaArrowAltCircleRight>}</p>
                </div>
                <div className={show}>
                <div className={watch} >
                    <BiSolidCoffee className='icon-big' />
                    <h2 className={text}><strong>watch</strong></h2>
                </div>
                <div className="mainMenu">
                    <div className="element">
                        <BiFilm className='icon' />
                        <NavLink to='/Home' className={text} > Home</NavLink>
                    </div>
                    <div className="element">
                        <FaRegHeart className='icon' />
                        <NavLink to='/Favourites'  className={text}> Favourites</NavLink>
                    </div>
                    <div className="element">
                        <FaArrowTrendUp className='icon' />
                        <NavLink to='/Trending' className={text} > Trending</NavLink>
                    </div>
                    <div className="element">
                        <LuCalendar className='icon' />
                        <NavLink to='/Coming' className={text} > Coming soon</NavLink>
                    </div>
                </div>
                <div className="comm">
                    <div className="element">
                        <GoPeople className='icon' />
                        <p className={text}> Community</p>
                    </div>
                    <div className="element">
                        <IoChatbubbleOutline className='icon' />
                        <p className={text}>Social</p>
                    </div>
                </div>
                <div className="addmenu">
                    <div className="element">
                        <GiSettingsKnobs className='icon' />
                        <p className={text}>Setting</p>
                    </div>
                    <div className="element">
                        <LuLogOut className='icon' />
                        <p  className={text} onClick={handleSignOut}>Logout</p> {/* Виклик handleSignOut при кліку */}
                    </div>
                </div>
                </div>
            </div>
        </>
    )
}
