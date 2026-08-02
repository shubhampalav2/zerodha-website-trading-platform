import React from "react";

function Hero() {
    return (
        <div className="container my-5">

            {/* Heading */}
            <div className="row border-bottom text-center pb-5 mb-5 mt-5 p-5">
                <div className="col-12">
                    <h1 className="display-5 fw-bold">Pricing</h1>
                    <h3 className="text-muted fs-5 mt-3">
                        Free equity investments and flat ₹20 intraday and F&O trades
                    </h3>
                </div>
            </div>

            {/* Cards */}
            <div className="row g-4 text-center">

                <div className="col-12 col-md-6 col-lg-4">
                    <div className="p-3 h-100">
                        <img
                            src="/images/pricingEquity.svg"
                            alt="Free equity delivery"
                            className="img-fluid mb-3"
                        />
                        <h2 className="fs-3">Free equity delivery</h2>
                        <p className="text-muted">
                            All equity delivery investments (NSE, BSE) are absolutely free —
                            ₹0 brokerage.
                        </p>
                    </div>
                </div>

                <div className="col-12 col-md-6 col-lg-4">
                    <div className="p-3 h-100">
                        <img
                            src="/images/intradayTrades.svg"
                            alt="Intraday and F&O trades"
                            className="img-fluid mb-3"
                        />
                        <h2 className="fs-3">Intraday and F&amp;O trades</h2>
                        <p className="text-muted">
                            Flat ₹20 or 0.03% (whichever is lower) per executed order on
                            intraday trades across equity, currency, and commodity.
                        </p>
                    </div>
                </div>

                <div className="col-12 col-md-6 col-lg-4 mx-md-auto">
                    <div className="p-3 h-100">
                        <img
                            src="/images/pricingEquity.svg"
                            alt="Free direct MF"
                            className="img-fluid mb-3"
                        />
                        <h2 className="fs-3">Free direct MF</h2>
                        <p className="text-muted">
                            All direct mutual fund investments are absolutely free —
                            ₹0 commissions &amp; DP charges.
                        </p>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default Hero;