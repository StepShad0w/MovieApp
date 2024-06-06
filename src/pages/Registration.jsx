
import { BiSolidCoffee } from "react-icons/bi";
import "./Registration.css"
import React, { useState } from 'react';
import LoginWindow from './LoginWindow';
export default function Registration() {
  const [showLoginWindow, setShowLoginWindow] = useState(false);
  const handleLoginClick = () => {
    setShowLoginWindow(true);
  }
  return (
    
    <div className='wrapper'> 
    <div className="header">
      <div className="window">
    <div className="log-window">
      <div className="watch">
      <BiSolidCoffee className='coffee' />
        <p className='watch-text'>WATCH</p>
      </div>
      <p>Enjoy the newest movies</p>
      <button className='log-button' onClick={handleLoginClick}>Log in</button>
      {showLoginWindow && <LoginWindow />}
      <div className="sign">
        <p>No account?</p>
        <p><strong>Sign up </strong></p>
      </div>
      </div>
    </div>
    </div>


    </div>
  )
}
