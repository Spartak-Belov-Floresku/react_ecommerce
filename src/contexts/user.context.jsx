import { createContext, useEffect, useReducer } from "react";
import {
    createUserDocumentFromAuth,
    onAuthStateChangedListener
}from '../utils/firebase/firebase.utils';

// as the actual value want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
}

const userReduser = (state, action) => {

    const { type, payload } = action;

    switch(type){
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            }
        default:
            throw new Error(`Unhandled type ${type} in userReduser!`)
    }
}

const INITIAL_STATE = {
    currentUser: null
}

export const UserProvider = ({children}) => {
    const [state, dispatch] = useReducer(userReduser, INITIAL_STATE);

    const { currentUser } = state;
    const setCurrentUser = user => dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user});
    console.log(currentUser)

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