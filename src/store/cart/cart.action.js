import { CART_ACTION_TYPE } from "./cart.type";
import { createAction } from "../../utils/reducer/reduser.utils";

const addCartItem = (cartItems, productToAdd) => {

    return !cartItems.length
        ? [{...productToAdd, quantity: 1 }]
        : cartItems.some(item => item.id === productToAdd.id)
            ? cartItems.map(item => item.id === productToAdd.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
                )
            : [...cartItems, { ...productToAdd, quantity: 1 }];
}

const clearCartItem = (cartItems, productToClear) => cartItems.filter(item => item.id !== productToClear.id);

const removeItemCart = (cartItems, productToRemove) => {
    return productToRemove.quantity > 1
        ?  cartItems.map(item => item.id === productToRemove.id
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
        : clearCartItem(cartItems, productToRemove);
}

export const addItemToCart = (cartItems, productToAdd) =>
    createAction(CART_ACTION_TYPE.SET_CART_ITEMS, addCartItem(cartItems, productToAdd));

export const removeItemFromCart = (cartItems, productToRemove) =>
    createAction(CART_ACTION_TYPE.SET_CART_ITEMS, removeItemCart(cartItems, productToRemove));

export const clearItemFromCart = (cartItems, productToClear) =>
    createAction(CART_ACTION_TYPE.SET_CART_ITEMS, clearCartItem(cartItems, productToClear));

export const setIsCartOpen = boolean => createAction(CART_ACTION_TYPE.SET_IS_CART_OPEN, boolean);
