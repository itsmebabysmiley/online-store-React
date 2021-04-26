import React from 'react'
import {Link} from 'react-router-dom';
const Navbar = () => {
    return (
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
          <Link className="navbar-brand" to="/">90's taste Admin</Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/stock">stock management</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/usermanage">user management</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">profile</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
}

export default Navbar
