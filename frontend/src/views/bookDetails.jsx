import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { BookContext } from '../context/bookContext';
import { CartContext } from '../context/cartContext';

export const BookDetails = () => {
    
    const { bookId } = useParams(); //Coger el ID del libro de la URL
    const { books } = useContext(BookContext); //Coger los libros del contexto
    const book = books.find(book => book.id.toString() === bookId); //Buscar el libro por ID

    const { addToCart } = useContext(CartContext);

    return (
        <section className="py-5">
            <div className="container px-4 px-lg-5 my-5">
                <div className="row gx-4 gx-lg-5 align-items-center">
                    <div className="col-md-6">
                        <img className="card-img-top mb-5 mb-md-0" src={book.cover_image} />
                    </div>
                    <div className="col-md-6">
                        <h1 className="display-5 fw-bolder">{book.title}</h1>
                        <div className="fs-5 mb-5">
                            <strong>{book.price} €</strong>
                        </div>
                        <p className="lead">{book.description}</p>
                        <div className="d-flex">
                            {
                            //<input className="form-control text-center me-3" id="inputQuantity" type="num" value="1" style="max-width: 3rem" />
                            }
                            <button className="btn btn-outline-dark flex-shrink-0" type="button" onClick={() => addToCart(book)}>
                                <i className="bi-cart-fill me-1"></i>
                                Añadir al Carrito
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}