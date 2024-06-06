import React from 'react';
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { LuBell } from "react-icons/lu";
import "./TopMenu.css";
import AuthDeteils from './components/AuthDeteils';

export default function TopMenu( ) {
  return (
    <>
      <div className="menutop">
        <div className="left-row">
          <p>Movies</p>
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
      </div>
    </>
  );
}
