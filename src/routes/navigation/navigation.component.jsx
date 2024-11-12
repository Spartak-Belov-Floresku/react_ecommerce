import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'

import { CartIcon } from '../../components/cart-icon/cart-icon.component';
import { CartDropdown } from '../../components/cart-dropdown/cart-dropdown.component';

import { selectCurrentUser } from '../../store/user/user.selector';
import { selectIsCartOpen } from '../../store/cart/cart.selector';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
// import { signOutUser } from '../../utils/firebase/firebase.utils';
import { signOutStart } from '../../store/user/user.action';

import {
    NavigationContainer,
    LogoContainer,
    NavLinks,
    NavLink
} from './navigation.styles';

export const Navigation = () => {

    const dispatch = useDispatch();

    const currentUser = useSelector(selectCurrentUser);
    const isCartOpen = useSelector(selectIsCartOpen);

    // const signOutHandler = async () => await signOutUser();
    const signOutHandler = () => dispatch(signOutStart());

    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <CrwnLogo className='logo'/>
                </LogoContainer>
                <NavLinks>
                    <NavLink to='shop'>
                        Shope
                    </NavLink>
                    {
                        currentUser ? (
                            <NavLink as='span' onClick={signOutHandler}>
                                Sing Out
                            </NavLink>
                        ): (
                            <NavLink to='auth'>
                                Sign In
                            </NavLink>
                        )
                    }
                    <CartIcon />
                </NavLinks>
                {isCartOpen && <CartDropdown />}
            </NavigationContainer>
            <Outlet /> {/* Will call all other components in App.js relay on the navigation call to build page. */}
        </Fragment>
    )
}