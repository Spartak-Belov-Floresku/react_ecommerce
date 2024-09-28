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

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => null,
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0
});

export const CartProvider = ({children}) => {

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCounnt] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((accumulator, item) => accumulator + item.quantity, 0);
        setCartCounnt(newCartCount);
    }, [cartItems]);

    const addItemToCart = productToAdd => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}