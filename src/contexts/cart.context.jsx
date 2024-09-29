import { createContext, useState, useEffect } from "react";

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

export const CartProvider = ({children}) => {

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {

        const newCartCount = cartItems.reduce(
            (accumulator, item) => accumulator + item.quantity, 0
        );
        setCartCount(newCartCount);

    }, [cartItems]);

    useEffect(() => {

        const newCartTotal = cartItems.reduce(
            (total, item) => total + (item.price*item.quantity), 0
        );
        setCartTotal(newCartTotal);

    }, [cartItems]);

    const addItemToCart = productToAdd => setCartItems(addCartItem(cartItems, productToAdd))

    const removeItemFromCart = productToRemove => setCartItems(removeItemCart(cartItems, productToRemove));

    const clearItemFromCart = productToClear => setCartItems(clearCartItem(cartItems, productToClear));

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