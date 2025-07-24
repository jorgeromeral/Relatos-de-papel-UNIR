import { useEffect, useState } from "react";
import booksData from "../../public/booksData.json";

export const useBooks = () => {
    
    const [books, setBooks] = useState([]);
    
    useEffect(() => {
        setBooks(booksData);
    }, []);
    
    return books;
    }