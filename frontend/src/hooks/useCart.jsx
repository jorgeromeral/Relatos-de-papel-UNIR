import { useState } from "react";

export const useCart = () => {

    const [cart, setCart] = useState([]);

    const addToCart = (book) => {
        setCart((prevCart) => prevCart.concat({ ...book, quantity: 1 }));
    };

    const removeFromCart = (bookId) => {
        setCart((prevCart) => prevCart.filter((book) => book.id !== Number(bookId)));
    };

    const clearCart = () => {
        setCart([]);
    };    

    const getTotalPrice = () => {
        return cart.reduce((total, book) => total + book.price * book.quantity, 0);
    };

    // Añadir al libro que se le ha cambiado la cantidad un parámetro quantity
    const updateQuantity = (bookId, quantity) => {
        setCart((prevCart) => 
            prevCart.map((book) => 
                book.id === Number(bookId) ? { ...book, quantity: Number(quantity) } : book
            )
        );
    };

    return {
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        getTotalPrice,
        updateQuantity
    };
};