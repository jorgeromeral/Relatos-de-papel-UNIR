import React from "react";

export const Footer = () => {
  return (
    <footer className="d-flex flex-wrap justify-content-center align-items-center py-3 my-4 border-top">
      <div className="col-md-4 d-flex align-items-center">
        <a href="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
          <img src="quijote.svg" className="bi" width="30" height="24"/>
        </a>
        <span className="mb-3 mb-md-0 text-muted">© 2022 Company, Inc</span>
      </div>

      <ul className="nav d-flex col-md-4 justify-content-end list-unstyled">
        <li className="ms-3"><a href=""><img src="/instagram.svg" className="bi" width="24" height="24"/></a></li>
        <li className="ms-3"><a href=""><img src="/twitter.svg" className="bi" width="24" height="24"/></a></li>
        <li className="ms-3"><a href=""><img src="/github.svg" className="bi" width="24" height="24"/></a></li>
      </ul>
    </footer>
  );
}