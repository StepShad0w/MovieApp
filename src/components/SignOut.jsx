// signOut.js
import { signOut as firebaseSignOut } from 'firebase/auth'
import { auth } from '../fireBase'

export const SignOut = () => {
    return firebaseSignOut(auth).then(() => {
        console.log('User signed out')
    }).catch((error) => {
        console.error('Sign out error:', error)
    })
}
