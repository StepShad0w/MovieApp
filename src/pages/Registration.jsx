import { BiSolidCoffee } from "react-icons/bi";
import "./Registration.css"
import React, { useState } from 'react';
import Signup from "../components/Signup";
import Login from "../components/Login";

export default function Registration() {
  const [showLoginWindow, setShowLoginWindow] = useState(false);
  const [showRegisterWindow, setShowRegisterWindow] = useState(false);

  const handleLoginClick = () => {
    setShowLoginWindow(!showLoginWindow);
    console.log("Login button clicked");
  }

  const handleRegisterClick = () => {
    setShowRegisterWindow(!showRegisterWindow);
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
            {showLoginWindow && <Login onClose={handleLoginClick} />}
            <div className="sign">
              <p>No account?</p>
              <p className="signitin" onClick={handleRegisterClick}><strong>Sign up</strong></p>
              {showRegisterWindow && <Signup onClose={handleRegisterClick} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
