import { createContext, useState, useEffect } from "react";


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

export const CartProvider = ({children}) => {

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
        setCartCount(newCartCount);
    },[cartItems])

    useEffect(() => {
        const newCartTotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
        setCartTotal(newCartTotal);
    },[cartItems])

    const addItemToCart = productToAdd => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const removeItemFromCart = cartItemToRemove => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));
    }

    const clearItemFromCart = cartItemToClear => {
        setCartItems(clearCartItem(cartItems, cartItemToClear));
    }

    const value = {isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, clearItemFromCart, cartItems, cartCount, cartTotal};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}