//import { useEffect, useState } from "react";
import { useFetch } from "./useFetch";

export const useBooks = () => {
    
    const apiURL = import.meta.env.VITE_API_URL;

    const books = useFetch(`${apiURL}/ms-books-catalogue/api/books`);
    
    return books;
    }