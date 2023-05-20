import {
    createContext,
    useReducer
} from "react";

import { createAction } from "../utils/reducer/reducer.utils";


const checkItemExistingInCart = (cartItems, item) => {
    return cartItems.find(cartItem => cartItem.id === item.id) && true;
}

const addCartItem = (cartItems, productToAdd) => {

    if(checkItemExistingInCart(cartItems, productToAdd)){
        return  cartItems.map(cartItem =>
                    cartItem.id === productToAdd.id
                    ? {...cartItem, quantity: cartItem.quantity + 1}
                    : cartItem
                );
    }

    return [...cartItems, {...productToAdd, quantity: 1}]
}

const removeCartItem = (cartItems, cartItemToRemove) => {

    if(checkItemExistingInCart(cartItems, cartItemToRemove)){
        return cartItemToRemove.quantity === 1
                ? cartItems.filter(item => item.id !== cartItemToRemove.id)
                : cartItems.map(cartItem =>
                        cartItem.id === cartItemToRemove.id
                        ? {...cartItem, quantity: cartItem.quantity - 1}
                        : cartItem
                    );
    }
}

const clearCartItem = (cartItems, cartItemToClear) => {
    if(checkItemExistingInCart(cartItems, cartItemToClear)){
        return cartItems.filter(item => item.id !== cartItemToClear.id);
    }
}


export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0,
});

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
}

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
}

const cartReducer  = (state, action) => {
    const { type, payload } = action;

    switch(type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return{
                ...state,
                ...payload,
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return{
                ...state,
                isCartOpen: payload,
            }
        default:
            throw new Error(`unhandled type of ${type} in cartReduser!`)
    }
}

export const CartProvider = ({children}) => {

    const [ {cartItems, isCartOpen, cartCount, cartTotal}, dispatch ] = useReducer(cartReducer, INITIAL_STATE);


    const updateCartItemsReducer = newCartItems => {
        const newCartCount = newCartItems.reduce(
            (total, cartItem) => total + cartItem.quantity, 0);
        const newCartTotal = newCartItems.reduce(
            (total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
        dispatch(
            createAction(
                CART_ACTION_TYPES.SET_CART_ITEMS,
                {
                    cartItems: newCartItems,
                    cartTotal: newCartTotal,
                    cartCount: newCartCount,
                }
            )
        )
    }

    const addItemToCart = productToAdd => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    }

    const removeItemFromCart = cartItemToRemove => {
        const newCartItems = removeCartItem(cartItems, cartItemToRemove);
        updateCartItemsReducer(newCartItems);
    }

    const clearItemFromCart = cartItemToClear => {
        const newCartItems = clearCartItem(cartItems, cartItemToClear);
        updateCartItemsReducer(newCartItems);
    }

    const setIsCartOpen = bool => [
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool))
    ]

    const value = {
        isCartOpen,
        setIsCartOpen,
        addItemToCart,
        removeItemFromCart,
        clearItemFromCart,
        cartItems,
        cartCount,
        cartTotal
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}