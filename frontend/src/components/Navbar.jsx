import { NavLink } from "react-router-dom";
const Navbar = () => {
    return <nav class="navbar navbar-expand-lg border-bottom d-flex flex-nowrap" style={{ backgroundColor: "#FFF", position: "fixed", width: "100vw" }}>
        <div class="container p-2">
            <NavLink className="navbar-brand" to="/">
                <img src="/images/logo.svg" alt="Logo Image" className="logo-img" />
            </NavLink>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">

                <form className="d-flex">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li clasName="nav-item">
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
                </form>
            </div>
        </div>
    </nav>
}

export default Navbar;