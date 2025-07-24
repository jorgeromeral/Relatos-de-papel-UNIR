import React, { useState } from 'react';
import '../styles/searchBar.css';

export const SearchBar = ({ query, handleSearch }) => {
    return (
        <div className="search-bar-container">
            <div>
                <h4>Catálogo de libros</h4>
            </div>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Buscar Libros..."
                    value={query}
                    onChange={handleSearch}
                    className="search-bar__input"
                />
            </div>
        </div>
    );
};
