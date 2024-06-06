import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../fireBase';

const Signup = ({ onClose }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [copyPassword, setCopyPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const register = (e) => {
        e.preventDefault();
        if (copyPassword !== password) {
            setError("Passwords do not match");
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
                setEmail("");
                setPassword("");
                setCopyPassword("");
                setError("");
                navigate('/Home');
            }).catch((error) => setError(error.message));
    }

    return (
        <>
            <div className="modal" onClick={onClose}>
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                    <h2>Sign Up</h2>
                    <form onSubmit={register} className='modal-content-form'>
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
                        <input 
                            placeholder='Confirm Password' 
                            value={copyPassword} 
                            onChange={(e) => setCopyPassword(e.target.value)}  
                            type="password" 
                            autoComplete="new-password"
                        />
                        <button className="log-window-button" type="submit">Create</button>
                        <button type="button" onClick={onClose}>Close</button>
                    </form>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
            </div>
        </>
    );
}

export default Signup;
