import React from 'react';
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { LuBell } from "react-icons/lu";
import "./TopMenu.css";

export default function TopMenu({ user }) {
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
            <p>{user ? user.displayName : 'Guest'}</p>
          </div>
        </div>
      </div>
    </>
  );
}
