import React, { useState, useContext, useEffect } from 'react'
import { auth } from '../services/firebase'

// creating an auth context
const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState(null)
    const [userLoading, setUserLoading] = useState(true)


    const signup = (email, password) => {
        // returning a promise
        // createUserWithEmailAndPassword - firebase method for creating a new user
        return auth.createUserWithEmailAndPassword(email, password)
    }

    const login = (email,password) => {
        return auth.signInWithEmailAndPassword(email,password)
    }

    const logout = () => {
        return auth.signOut()
    }

    const forgotPassword = (email) => {
        return auth.sendPasswordResetEmail(email)
    }

    useEffect(() => {
        // if new user -> set user in firebase
        // useEffect will only load once 
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setUserLoading(false)
        })

        return unsubscribe
    }, [])
     
    const value = {
        currentUser,
        signup,
        login,
        logout,
        forgotPassword,
    }

    return (
        <AuthContext.Provider value={value}>
            {!userLoading && children}
        </AuthContext.Provider>


    )
}