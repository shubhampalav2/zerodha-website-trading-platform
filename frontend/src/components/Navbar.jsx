import { NavLink } from "react-router-dom";

const Navbar = () => {
    return <nav className="site-navbar navbar navbar-expand-lg border-bottom">
        <div className="container">
            <NavLink className="navbar-brand" to="/">
                <img src="/images/logo.svg" alt="Zerodha" className="logo-img" />
            </NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <NavLink className="nav-link" aria-current="page" to="/signup">Signup</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/about">About</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/products">Products</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/charges">Pricing</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/support">Support</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
}

export default Navbar;
