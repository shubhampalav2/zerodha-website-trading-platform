import React from "react";

function Universe() {
    function redirect(url) {
        window.open(url, "_blank");
    }
    return (
        <div className="container my-5">
            <div className="row text-center">
                <div className="col-12 mb-4">
                    <h1>The Zerodha Universe</h1>
                    <p>
                        Extend your trading and investment experience even further with our
                        partner platforms
                    </p>
                </div>

                {/* Card 1 */}
                <div
                    className="col-12 col-sm-6 col-lg-4 mb-5"
                    onClick={() => redirect("https://www.zerodhafundhouse.com/")}
                    style={{ cursor: "pointer" }}
                >
                    <img src="/images/zerodhaFundhouse.png" className="universe-img" />
                    <p className="text-small text-muted mt-3">
                        Our asset management venture that is creating simple and transparent
                        index funds to help you save for your goals.
                    </p>
                </div>

                {/* Card 2 */}
                <div
                    className="col-12 col-sm-6 col-lg-4 mb-5"
                    onClick={() => redirect("https://sensibull.com/")}
                    style={{ cursor: "pointer" }}
                >
                    <img src="/images/sensibullLogo.svg" className="universe-img" />
                    <p className="text-small text-muted mt-3">
                        Options trading platform that lets you create strategies, analyze
                        positions, and examine data points like open interest, FII/DII, and
                        more.
                    </p>
                </div>

                {/* Card 3 */}
                <div
                    className="col-12 col-sm-6 col-lg-4 mb-5"
                    onClick={() =>
                        redirect("https://www.tijorifinance.com/dashboard/")
                    }
                    style={{ cursor: "pointer" }}
                >
                    <img src="/images/tijori.svg" className="universe-img" />
                    <p className="text-small text-muted mt-3">
                        Investment research platform that offers detailed insights on stocks,
                        sectors, supply chains, and more.
                    </p>
                </div>

                {/* Card 4 */}
                <div
                    className="col-12 col-sm-6 col-lg-4 mb-5"
                    onClick={() => redirect("https://www.streak.tech/")}
                    style={{ cursor: "pointer" }}
                >
                    <img src="/images/streakLogo.png" className="universe-img" />
                    <p className="text-small text-muted mt-3">
                        Systematic trading platform that allows you to create and backtest
                        strategies without coding.
                    </p>
                </div>

                {/* Card 5 */}
                <div
                    className="col-12 col-sm-6 col-lg-4 mb-5"
                    onClick={() => redirect("https://smallcase.zerodha.com/")}
                    style={{ cursor: "pointer" }}
                >
                    <img src="/images/smallcaseLogo.png" className="universe-img" />
                    <p className="text-small text-muted mt-3">
                        Thematic investing platform that helps you invest in diversified
                        baskets of stocks and ETFs.
                    </p>
                </div>

                {/* Card 6 */}
                <div
                    className="col-12 col-sm-6 col-lg-4 mb-5"
                    onClick={() => redirect("https://joinditto.in/")}
                    style={{ cursor: "pointer" }}
                >
                    <img src="/images/dittoLogo.png" className="universe-img" />
                    <p className="text-small text-muted mt-3">
                        Personalized advice on life and health insurance. No spam and no
                        mis-selling. Sign up for free.
                    </p>
                </div>

                <div className="col-12">
                    <button
                        className="btn btn-primary btn-lg px-5 py-2"
                        onClick={() =>
                            window.open("https://zerodha.com/open-account/", "_blank")
                        }
                    >
                        Signup Now
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Universe;