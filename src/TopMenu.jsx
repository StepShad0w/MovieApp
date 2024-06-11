import React from 'react';
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { LuBell } from "react-icons/lu";
import "./TopMenu.css";
import AuthDeteils from './components/AuthDeteils';
import { NavLink } from 'react-router-dom';

export default function TopMenu( ) {
  return (
    <>
      <div className="menutop">
       <section className='whatwesee'>
       <div className="left-row">
       <NavLink to='/Coming' className="navLink" > Movies</NavLink>
          <p>Series</p>
          <p>Documentaries</p>
        </div>
        <div className="right-row">
          <HiOutlineMagnifyingGlass className='icon' />
          <LuBell className='icon' />
          <div className="acount">
            <p> <AuthDeteils></AuthDeteils></p>
          </div>
        </div>
       </section>
       <section className='whatwedont' >
        
       </section>
      </div>
      
    </>
  );
}
