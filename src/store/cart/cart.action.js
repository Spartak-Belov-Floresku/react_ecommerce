import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";


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

export const setIsCartOpen = boolean => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);

export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const clearItemFromCart = (cartItems, cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}