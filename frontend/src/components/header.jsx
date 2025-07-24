import "../styles/header.css";
import React from "react";
import { Link } from "react-router-dom";
import { Cart } from "./cart";

export const Header = () => {
  
  return (
    <header className="p-3 mb-3 border-bottom">
      <div className="container d-flex justify-content-between">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start ">
          <Link to="/books" className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
            <img src="quijote.svg" className="bi" width="44" height="44" role="img" aria-label="Bootstrap"/>
            <h2 id="header_title" className="mx-4">Relatos de Papel</h2>
          </Link>
        </div>
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <Cart />
        </div>
      </div>
    </header>
  );
}

/* FUTUROS CAMBIOS

<ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
   <li><a href="#" className="nav-link px-2 link-secondary">Overview</a></li>
   <li><a href="#" className="nav-link px-2 link-dark">Inventory</a></li>
   <li><a href="#" className="nav-link px-2 link-dark">Customers</a></li>
   <li><a href="#" className="nav-link px-2 link-dark">Products</a></li>
 </ul> 

<div className="dropdown text-end">
  <ul className="dropdown-menu text-small">
    <li><a className="dropdown-item" href="#">New project...</a></li>
    <li><a className="dropdown-item" href="#">Settings</a></li>
    <li><a className="dropdown-item" href="#">Profile</a></li>
    <li><hr className="dropdown-divider"/></li>
    <li><a className="dropdown-item" href="#">Sign out</a></li>
  </ul>
</div>

USUARIO:
<a href="#" className="mx-3 d-block link-dark text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
  <img src="user.svg" alt="mdo" width="32" height="32" className="rounded-circle"/>
</a>
*/