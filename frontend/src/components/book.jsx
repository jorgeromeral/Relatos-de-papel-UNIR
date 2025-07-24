import '../styles/book.css';
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/cartContext";

export const Book = ({ id, title, author, rating, price, cover_image }) => {

  const { addToCart } = useContext(CartContext);
  const book = { id, title, author, rating, price, cover_image };

  return (
    <div className="col">
      <div id='book_card' className="card mb-3">
        <div className="row g-0">
          <Link className="text-decoration-none col-md-4" to={`/books/${id}` }>
            <img src={cover_image} className="img-fluid rounded-start" alt={title} />
          </Link>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <h6 className="card-text">{author}</h6>
              <p className="card-text">Rating: {rating}</p>
              <div id='book_buttons'>
                <button type="button" class="btn btn-secondary" onClick={() => addToCart(book)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"></path>
                  </svg>
                </button>
                <Link className="text-decoration-none col-md-4" to={`/books/${id}` }>
                  <button className="btn btn-primary">Detalles</button>
                </Link>
                <p className="card-text mx-3 my-3"><strong>{price}€</strong></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

