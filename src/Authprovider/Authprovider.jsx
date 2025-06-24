import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from '../Firebase/Firebase.config';
export const Authcontext = createContext()

const Authprovider = ({ children }) => {
    const auth = getAuth(app);

    const [users, setuser] = useState([])
    useEffect(() => {
        const unsuscribe = onAuthStateChanged(auth, (cureentuser) => {
            setuser(cureentuser)
        })
        return () => {
            unsuscribe()
        };
    }, [])

    console.log(users)

    const createuser = (email, pass) => {
        return createUserWithEmailAndPassword(auth, email, pass)

    }
    const handlelogin = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const handleLogout = () => {
        return signOut(auth)
    }

    const userinfo = {
        createuser, users, setuser, handleLogout, handlelogin
    }


    auth
    return <Authcontext.Provider value={userinfo}>
        {children}
    </Authcontext.Provider>
};

export default Authprovider;