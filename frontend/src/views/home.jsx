import React, { useContext } from 'react';
import { BookContext } from '../context/bookContext';
import { Book } from "../components/book";
import { SearchBar } from "../components/searchBar";
import { useSearchBar } from '../hooks/useSearchBar';

export const Home = () => {
    const { books } = useContext(BookContext);
    const { query, handleSearch, filteredBooks } = useSearchBar(books);

    return (
        <div className="container">
            <SearchBar query={ query } handleSearch={ handleSearch } />
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {filteredBooks.length > 0 ? (
                    filteredBooks.map(book => (
                        <Book
                            key={book.id}
                            id={book.id}
                            title={book.title}
                            author={book.author}
                            rating={book.rating}
                            price={book.price}
                            cover_image={book.cover_image}
                        />
                    ))
                ) : (
                    <p>No hay libros disponibles</p>
                )}
            </div>
        </div>
    );
};