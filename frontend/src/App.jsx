import React from 'react';
import './App.css';
import GlobalRouter from './router/globalRouter';
import { BookContext } from './context/bookContext';
import { CartContext } from './context/cartContext';
import { useBooks } from './hooks/useBooks';
import { useCart } from './hooks/useCart';

function App() {

  const books = useBooks();
  const {cart, addToCart, removeFromCart, clearCart, getTotalPrice, updateQuantity} = useCart();

  return (
    <BookContext.Provider value={{books}}>
      <CartContext.Provider value={{cart, addToCart, removeFromCart, clearCart, getTotalPrice, updateQuantity}}>
        <GlobalRouter></GlobalRouter>
      </CartContext.Provider>
    </BookContext.Provider>
  );
  
}

export default App;
