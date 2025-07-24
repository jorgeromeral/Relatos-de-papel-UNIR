import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from '../views/home';
import { Checkout } from '../views/checkout';
import { BookDetails } from '../views/bookDetails';
import { Landing } from '../views/landing';
import { NotFound } from '../views/notFound';
import { Header } from '../components/header';
import { Footer } from '../components/footer';
import { Cart } from '../components/cart';

const GlobalRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/books" element={<Layout><Home /></Layout>} />
                <Route path="/books/:bookId" element={<Layout><BookDetails /></Layout>} />
                <Route path="/checkout" element={<Layout><Checkout /></Layout>} />
                <Route path="*" element={<Layout><NotFound /></Layout>} />
                <Route path="/prueba" element={<Cart />} />
            </Routes>
        </BrowserRouter>
    );
};

const Layout = ({ children }) => {
    return (
    <>
        <Header />
        {children}
        <Footer />
    </>
    );
}

export default GlobalRouter;