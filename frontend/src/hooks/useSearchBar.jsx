import { useState, useEffect } from 'react';

export const useSearchBar = (books) => {
    const [query, setQuery] = useState('');
    const [filteredBooks, setFilteredBooks] = useState([]);

    useEffect(() => {
        setFilteredBooks(
            books.filter((book) =>
                book.title.toLowerCase().includes(query.toLowerCase())
            )
        );
    }, [query, books]);

    const handleSearch = (event) => {
        setQuery(event.target.value);
    };

    return { query, handleSearch, filteredBooks };
};