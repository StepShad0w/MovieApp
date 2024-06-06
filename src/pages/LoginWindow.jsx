import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../fireBase.js';
import './CSS/Login.css';
import Auth from '../components/Auth.jsx';
import AuthProvider from '../components/Auth.jsx';
function LoginWindow() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

 const handleLogin =() => {
    // setError(null); // Clear previous errors
    // try {
    //   console.log(`Attempting to log in with Username: ${name}, Password: ${password}`);
    //   await auth.signInWithEmailAndPassword(name, password);
    //   console.log("Login successful");
    //   navigate('/Home');
    // } catch (error) {
    //   console.error("Error during login:", error);
    //   setError(error.message);
    return (
      <AuthProvider></AuthProvider>
    )
    // }

  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Log In</h2>
        {error && <p className="error-message">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          value={name}
          onChange={handleChangeName}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handleChangePassword}
        />
        <button className="log-window-button" onClick={handleLogin}>Login</button>
        {/* <AuthProvider></AuthProvider> */}
      </div>
    </div>
  );
}

export default LoginWindow;
