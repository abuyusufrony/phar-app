import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from '../Firebase/Firebase.config';
export const Authcontext = createContext()

const Authprovider = ({ children }) => {
    const auth = getAuth(app);

    const [users, setuser] = useState([])
    const [loading, setloading] = useState(true)
    useEffect(() => {
        const unsuscribe = onAuthStateChanged(auth, (cureentuser) => {
            setuser(cureentuser)
            setloading(false)
        })
        return () => {
            unsuscribe()
        };
    }, [])

    console.log(users)

    const createuser = (email, pass) => {
        setloading(true)
        return createUserWithEmailAndPassword(auth, email, pass)

    }
    const handlelogin = (email, password) => {
        setloading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const handleLogout = () => {
        setloading(true)
        return signOut(auth)
    }

    const userinfo = {
        createuser, users, setuser, handlelogin, handleLogout, loading
    }


    auth
    return <Authcontext.Provider value={userinfo}>
        {children}
    </Authcontext.Provider>
};

export default Authprovider;