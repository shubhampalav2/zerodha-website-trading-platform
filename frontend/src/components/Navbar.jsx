import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const close = () => setOpen(false);
    return <nav className="site-navbar">
        <div className="site-nav-inner">
            <Link className="brand-lockup" to="/" onClick={close}><span className="brand-symbol">T</span><span>Tangel<span>Trader</span></span></Link>
            <button className="nav-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} onClick={() => setOpen(value => !value)}><span/><span/><span/></button>
            <div className={`site-nav-links ${open ? 'is-open' : ''}`}>
                <a href="/#home" onClick={close}>Home</a><a href="/#features" onClick={close}>Features</a><a href="/#about" onClick={close}>About</a><NavLink to="/support" onClick={close}>Contact</NavLink>
                <Link className="nav-login" to="/signup" onClick={close}>Login</Link><Link className="nav-start" to="/signup" onClick={close}>Get started <span>→</span></Link>
            </div>
        </div>
    </nav>;
}
