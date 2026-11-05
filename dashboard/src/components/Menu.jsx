import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import "./Menu.css";
import { getUserName } from "../common/Storage";

const Menu = () => {
    const [selectedMenu, setSelectedMenu] = useState(0);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    //created a state variable for mobile menu
    const [mobileMenu, setMobileMenu] = useState(false);

    const [username, setUsername] = useState("");

    useEffect(() => {
        setUsername(getUserName());
        const syncUsername = (event) => setUsername(event.detail || getUserName() || "");
        window.addEventListener("username-updated", syncUsername);
        return () => window.removeEventListener("username-updated", syncUsername);
    }, []);

    const handleMenuClick = (index) => {
        setSelectedMenu(index);
        setMobileMenu(false);
    };

    const handleProfileClick = () => {
        setIsProfileDropdownOpen((isOpen) => !isOpen);
    };

    const menuClass = "menu";
    const activeMenuClass = "menu selected";

    return (
        <div className="menu-container">
            <button type="button" className="hamburger" aria-label={mobileMenu ? "Close navigation menu" : "Open navigation menu"} aria-expanded={mobileMenu} onClick={() => setMobileMenu((isOpen) => !isOpen)}>&#9776;</button>
            <div className={`menus ${mobileMenu ? 'active' : ''}`}>
                <ul>
                    <li>
                        <Link
                            style={{ textDecoration: "none" }}
                            to="/"
                            onClick={() => handleMenuClick(0)}
                        >
                            <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>
                                Dashboard
                            </p>
                        </Link>
                    </li>
                    <li>
                        <Link
                            style={{ textDecoration: "none" }}
                            to="/orders"
                            onClick={() => handleMenuClick(1)}
                        >
                            <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>
                                Orders
                            </p>
                        </Link>
                    </li>
                    <li>
                        <Link
                            style={{ textDecoration: "none" }}
                            to="/holdings"
                            onClick={() => handleMenuClick(2)}
                        >
                            <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>
                                Holdings
                            </p>
                        </Link>
                    </li>
                    <li>
                        <Link
                            style={{ textDecoration: "none" }}
                            to="/stocks"
                            onClick={() => handleMenuClick(3)}
                        >
                            <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>
                                Stocks
                            </p>
                        </Link>
                    </li>
                </ul>
                <hr />
                <div className="profile" onClick={handleProfileClick}>
                    <div className="avatar">{username ? username.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase() : "TT"}</div>
                </div>
                {isProfileDropdownOpen && <div className="profile-dropdown">
                    <div className="dropdown-header">
                        <div className="avatar large">{username ? username.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase() : "TT"}</div>

                        <div>
                            <h4>{username || "Your account"}</h4>
                            <p>{username}</p>
                        </div>
                    </div>

                    <hr />

                    <Link className="logout" onClick={() => {
                        //clearing the localstorage
                        localStorage.clear();
                        window.open("http://localhost:3000/signup", "_self");
                    }}>
                        Logout
                    </Link>
                </div>}
            </div>
        </div>
    );
};

export default Menu;
