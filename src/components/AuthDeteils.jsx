import { onAuthStateChanged, signOut } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { auth } from '../fireBase'

const AuthDeteils = () => {
    const [authUser, setAuthUser] = useState(null)
    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user)
            } else {
                setAuthUser(null)
            }
        });
        return () => {
            listen()
        }
    }, [])
    const nickname = authUser?.email && authUser?.email.split("@")?.[0];

    
    return (
        <div>{authUser ? (
            <p>{nickname}</p>
        ) : "Guest"}</div>
    )
}

export default AuthDeteils 