import { createContext, useReducer } from "react";
import { createAction } from "../utils/firebase/reducer/reduser,utils";

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


export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => null,
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
});

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
}

const CART_ACTION_TYPE = {
    SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
    SET_CART_ITEMS: "SET_CART_ITEMS",
}

const cartReduser = (state, action) => {

    const { type, payload } = action;

    switch(type){
        case CART_ACTION_TYPE.SET_IS_CART_OPEN:
            return { ...state, isCartOpen: payload }
        case CART_ACTION_TYPE.SET_CART_ITEMS:
            return { ...state, ...payload }
        default:
            throw new Error(`Unhandled type ${type} in cartReduser!`)

    }
}


export const CartProvider = ({children}) => {

    const [state, dispatch] = useReducer(cartReduser, INITIAL_STATE);
    const { isCartOpen, cartItems, cartCount, cartTotal } = state;

    const updateCartItemReduser = newCartItems => {

        const newCartCount = newCartItems.reduce((accumulator, item) => accumulator + item.quantity, 0);
        const newCartTotal = newCartItems.reduce((total, item) => total + (item.price*item.quantity), 0);

        dispatch(
            createAction(
                CART_ACTION_TYPE.SET_CART_ITEMS,
                {cartItems: newCartItems, cartTotal: newCartTotal, cartCount: newCartCount}
            )
        );
    }

    const setIsCartOpen = bool => dispatch(createAction(CART_ACTION_TYPE.SET_IS_CART_OPEN, bool));

    const addItemToCart = productToAdd => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemReduser(newCartItems);
    }
    const removeItemFromCart = productToRemove => {
        const newCartItems = removeItemCart(cartItems, productToRemove);
        updateCartItemReduser(newCartItems);
    }
    const clearItemFromCart = productToClear => {
        const newCartItems = clearCartItem(cartItems, productToClear);
        updateCartItemReduser(newCartItems);
    }


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