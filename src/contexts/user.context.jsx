import { createContext, useState, useEffect } from "react";
import {
    createUserDocumentFromAuth,
    onAuthStateChangedListener
}from '../utils/firebase/firebase.utils';

// as the actual value want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});

export const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser};

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener(user => { // the user comes from auth in firebase.utils as a call back function
            if(user){
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        });
        return unsubscribe
    }, [])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}