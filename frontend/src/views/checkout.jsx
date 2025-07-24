import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/cartContext';

export const Checkout = () => {

    const { cart, clearCart, getTotalPrice } = useContext(CartContext);
    
    const navigate = useNavigate();

    const handleSubmit = () => {
        alert("Pago Realizado con Éxito");
        clearCart();
        navigate("/");
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Checkout</h1>
            <div className="row">
                <div className="col-md-8">
                    <div className="card shadow-sm mb-4">
                        <div className="card-body">
                            <h2 className="card-title mb-4">Información de Envío y Pago</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="row mb-3">
                                    <div className="col-md-6 mb-3 mb-md-0">
                                        <label for="name" className="form-label">Nombre Completo</label>
                                        <input id="name" name="name" className="form-control"/>
                                    </div>
                                    <div className="col-md-6">
                                        <label for="email" className="form-label">Email</label>
                                        <input id="email" name="email" type="email" className="form-control"/>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label for="address" className="form-label">Dirección</label>
                                    <input id="address" name="address" className="form-control"/>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-6 mb-3 mb-md-0">
                                        <label for="city" className="form-label">Ciudad</label>
                                        <input id="city" name="city" className="form-control"/>
                                    </div>
                                    <div className="col-md-3 mb-3 mb-md-0">
                                        <label for="country" className="form-label">País</label>
                                        <input id="country" name="country" className="form-control"/>
                                    </div>
                                    <div className="col-md-3">
                                        <label for="zipCode" className="form-label">Código Postal</label>
                                        <input id="zipCode" name="zipCode" className="form-control"/>
                                    </div>
                                </div>
                                <hr className="my-4" />
                                <h3 className="mb-3">Información de Pago</h3>
                                <div className="mb-3">
                                    <label for="cardName" className="form-label">Nombre en la Tarjeta</label>
                                    <input id="cardName" name="cardName" className="form-control"/>
                                </div>
                                <div className="mb-3">
                                    <label for="cardNumber" className="form-label">Número de Tarjeta</label>
                                    <input id="cardNumber" name="cardNumber" className="form-control"/>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3 mb-md-0">
                                        <label for="expDate" className="form-label">Fecha de Expiración</label>
                                        <input id="expDate" name="expDate" placeholder="MM/YY" className="form-control"/>
                                    </div>
                                    <div className="col-md-6">
                                        <label for="cvv" className="form-label">CVV</label>
                                        <input id="cvv" name="cvv" placeholder="XXX" className="form-control"/>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <button className="btn btn-primary btn-lg w-100" onClick={handleSubmit}>Realizar Pago</button>
                </div>
                <div className="col-md-4">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h2 className="card-title mb-4">Resumen del Pedido</h2>
                            <div>
                                {cart.map((book) => (
                                    <div key={book.id} className="d-flex justify-content-between mb-2">
                                        <p className="mb-0">"{book.title}" / x {book.quantity}</p>
                                        <p className="mb-0">{(book.price * book.quantity).toFixed(2)} €</p>
                                    </div>
                                ))}
                                <hr className="my-3" />
                                <div className="d-flex justify-content-between">
                                    <strong>Total</strong>
                                    <strong>{getTotalPrice()} €</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}