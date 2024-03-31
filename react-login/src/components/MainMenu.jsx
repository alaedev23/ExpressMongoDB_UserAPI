import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import UserContext from '../context/UserContext.jsx';
import "./MainMenu.css";

const NavBar = () => {
    const { user } = useContext(UserContext);

    return (
        <nav className="navbar navbar-expand-lg bg-dark">
            <div className="container container-fluid">
                <span className="navbar-brand text-light">SoftGPL</span>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon text-light"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link text-light" to="/">HOME</NavLink>
                        </li>
                        {!user && (
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link text-light" to="/login">LOGIN</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link text-light" to="/register">REGISTER</NavLink>
                                </li>
                            </>
                        )}
                        {user && (
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link text-light" to="/profile">PROFILE</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link text-light" to="/notes">NOTES</NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                    <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-light" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
