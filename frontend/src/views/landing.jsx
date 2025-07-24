import '../styles/landing.css';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';


export const Landing = () => {

    // Al pasar 5 segundos, redirigir a la página de inicio
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            navigate("/books");
        }, 5000);
    });

    return (
        <div className='container' id='landing'>
            <div id='landing__content'> 
                <img id='landing__img' src="/quijote.svg"/>
                <h1 id='landing__h1'>Relatos de Papel</h1>
                <h3 id='landing__h3'>"En un lugar de la Mancha, de cuyo nombre no quiero acordarme..."</h3>
                <Link to={'/books'}>
                    <a className="btn btn-primary btn-xl">Descubre Nuevos Libros</a>
                </Link>
            </div>
        </div>
    );
}