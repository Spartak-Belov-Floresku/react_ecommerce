import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
    Routes,
    Route,
    Navigate
} from 'react-router-dom';

import {
    createUserDocumentFromAuth,
    onAuthStateChangedListener
}from './utils/firebase/firebase.utils';

import { Navigation } from './routes/navigation/navigation.component';
import { Home } from './routes/home/home.component';
import { Authentication } from './routes/authentication/authentication.component';
import { Shop } from './routes/shop/shop.component';
import { Checkout } from './routes/checkout/checkout.component';
import { setCurrentUser } from "./store/user/user.action";

export const App = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener(user => { // the user comes from auth in firebase.utils as a call back function
            if(user){
                createUserDocumentFromAuth(user);
            }
            dispatch(setCurrentUser(user));
        });
        return unsubscribe
    }, [dispatch])

    return (
        <Routes>
            <Route path='/' element={<Navigation />}>
                <Route index element={<Home />} />
                <Route path="shop/*" element={<Shop />} />
                <Route path='auth' element={<Authentication />} />
                <Route path='checkout' element={<Checkout />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
    );
}