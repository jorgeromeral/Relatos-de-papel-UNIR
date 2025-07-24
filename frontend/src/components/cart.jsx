import "../styles/cart.css";
import React, { useContext } from "react";
import { useToggle } from "../hooks/useToggle";
import { CartContext } from "../context/cartContext";
import { Link } from "react-router";

export const Cart = () => {
  
  const { cart, removeFromCart, clearCart, updateQuantity } = useContext(CartContext);
  const [ isToggled, toggle ] = useToggle();

  return (
    <>
      <div className="cart">
        <button className="" onClick={toggle}>
          <img src="/cart.svg" alt="Cart" width="16" height="16" />
        </button>
        {isToggled && (
          <div id="cart_resume" className="card">
            <header id="cart_header" className="py-3">
              <h3>Carrito</h3>
            </header>
            <ul className="cart_list">
              {cart.length === 0 && <li className='cart_book'>Carrito Vacío</li>}
              {cart.map((book) => (
                <li className='cart_book' key={book.id}>
                  {book.title}

                  <input id="cart_input" onChange={(e) => updateQuantity(book.id, e.target.value)} min="1" max="10" type="number" placeholder="1"/>

                  <button className="btn btn-danger btn-sm" onClick={() => {
                    console.log("Removing book with ID:", book.id);
                    removeFromCart(book.id)
                  }}>x</button>
                </li>
              ))}
            </ul>
            <footer id="cart_footer">
              <Link to="/checkout">
                <button id="cart_checkout" className="btn btn-primary btn-sm" onClick={toggle}><strong>Ir a Checkout</strong></button>
              </Link>
              <button className="btn btn-danger btn-sm" onClick={clearCart}><strong>Vacíar</strong></button>
            </footer>
            
          </div>
        )}
      </div>
      <span className="position-absolute top-1 start-75 translate-middle badge rounded-pill bg-secondary">
        {cart.length}
      </span>
    </>
  );
};

