import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { auth } from '../fireBase'
import { useNavigate } from 'react-router-dom'
import '../pages/CSS/Login.css';

const Login = ({ onClose }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const navigate = useNavigate()

    const login = (e) => {
        e.preventDefault()
        
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential)
                setEmail("")
                setPassword("")
                setError("")
                navigate('/Home')  
            }).catch((error) => {
                if (error.code === 'auth/user-not-found') {
                    setError('User not found. Please sign up.')
                } else {
                    setError(error.message)
                }
            })
    }

    return (
        <>
        <div className="modal-log" onClick={onClose}>
        <div className="modal-content-log"  onClick={e => e.stopPropagation()}>
        <h2>Log In</h2>
            <form onSubmit={login} className='modal-content-form'>
                <input 
                    placeholder='Email' 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    type="email" 
                    autoComplete="email"
                />
                <input 
                    placeholder='Password' 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}  
                    type="password" 
                    autoComplete="new-password"
                />
                
                
                
                    
                    
                    <button className="log-window-button" type="submit" disabled={!email || !password}>Login</button>
                    <button type="button" onClick={onClose}>Close</button>
                
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
            </div>
        </>
    )
}

export default Login
