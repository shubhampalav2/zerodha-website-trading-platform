const Footer = () => {
    return <footer className="bg-light py-5 mt-5" style={{ backgroundColor: "rgba(219,219,219,0.84)" }}>
        <div className="container text-center">
            <div className="row gy-4">

                {/* Logo */}
                <div className="col-12 col-md-6 col-lg-3">
                    <img
                        src="/images/logo.svg"
                        alt="Logo"
                        className="img-fluid"
                        style={{ maxWidth: "180px" }}
                    />
                    <p className="mt-2">© 2010 - 2026, TangelTrader Broking Ltd.All rights reserved.</p>
                </div>

                {/* Account */}
                <div className="col-12 col-md-3 col-lg-2">
                    <h6 className="fw-bold mb-3">Account</h6>

                    <div className="d-flex flex-column gap-2">
                        <a href="#" target="_blank" rel="noreferrer" className="nav-links">
                            Open demat account
                        </a>
                        <a href="#" target="_blank" rel="noreferrer" className="nav-links">
                            Minor demat account
                        </a>
                        <a href="#" target="_blank" rel="noreferrer" className="nav-links">
                            NRI demat account
                        </a>
                        <a href="#" className="nav-links">HUF demat account</a>
                        <a href="#" className="nav-links">Commodity</a>
                        <a href="#" className="nav-links">Dematerialisation</a>
                        <a href="#" className="nav-links">Fund transfer</a>
                        <a href="#" className="nav-links">MTF</a>
                    </div>
                </div>

                {/* Support */}
                <div className="col-12 col-md-3 col-lg-2">
                    <h6 className="fw-bold mb-3">Support</h6>

                    <div className="d-flex flex-column gap-2">
                        <a href="#" target="_blank" className="nav-links">Contact Us</a>
                        <a href="#" target="_blank" className="nav-links">Support portal</a>
                        <a href="#" className="nav-links">How to file a complaint?</a>
                        <a href="#" className="nav-links">Status of your complaints</a>
                        <a href="#" className="nav-links">Bulletin</a>
                        <a href="#" className="nav-links">Circular</a>
                        <a href="#" className="nav-links">Z-Connect blog</a>
                        <a href="#" className="nav-links">Downloads</a>
                    </div>
                </div>

                {/* Company */}
                <div className="col-12 col-md-3 col-lg-2">
                    <h6 className="fw-bold mb-3">Company</h6>

                    <div className="d-flex flex-column gap-2">
                        <a href="#" className="nav-links">About</a>
                        <a href="#" className="nav-links">Philosophy</a>
                        <a href="#" className="nav-links">Press & Media</a>
                        <a href="#" className="nav-links">Careers</a>
                        <a href="#" className="nav-links">TangelTrader Cares (CSR)</a>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="col-12 col-md-3 col-lg-3">
                    <h6 className="fw-bold mb-3">Quick Links</h6>

                    <div className="d-flex flex-column gap-2">
                        <a href="#" className="nav-links">Upcoming IPOs</a>
                        <a href="#" className="nav-links">Brokerage charges</a>
                        <a href="#" className="nav-links">Market holidays</a>
                        <a href="#" className="nav-links">Economic calendar</a>
                        <a href="#" className="nav-links">Calculators</a>
                    </div>
                </div>

            </div>
        </div>
    </footer>
}

export default Footer;