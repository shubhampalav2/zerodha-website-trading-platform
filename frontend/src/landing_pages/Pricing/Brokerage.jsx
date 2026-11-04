import React from "react";

function Brokerage() {
    return (
        <div className="container my-5">
            <div className="row border-top pt-5 g-4">

                {/* Brokerage Calculator */}
                <div className="col-12 col-lg-8">
                    <a href="" className="text-decoration-none">
                        <h3 className="fs-5 text-center text-lg-start">
                            Brokerage calculator
                        </h3>
                    </a>

                    <ul
                        className="text-muted ps-3"
                        style={{ lineHeight: "2", fontSize: "0.9rem" }}
                    >
                        <li>
                            Call & Trade and RMS auto-squareoff: Additional charges of ₹50 +
                            GST per order.
                        </li>
                        <li>
                            Digital contract notes will be sent via e-mail.
                        </li>
                        <li>
                            Physical copies of contract notes, if required, shall be charged
                            ₹20 per contract note. Courier charges apply.
                        </li>
                        <li>
                            For NRI account (non-PIS), 0.5% or ₹100 per executed order for
                            equity (whichever is lower).
                        </li>
                        <li>
                            For NRI account (PIS), 0.5% or ₹200 per executed order for equity
                            (whichever is lower).
                        </li>
                        <li>
                            If the account is in debit balance, any order placed will be
                            charged ₹40 per executed order instead of ₹20 per executed order.
                        </li>
                    </ul>
                </div>

                {/* List of Charges */}
                <div className="col-12 col-lg-4">
                    <a href="" className="text-decoration-none">
                        <h3 className="fs-5 text-center text-lg-start">
                            List of charges
                        </h3>
                    </a>

                    <ul
                        className="text-muted ps-3"
                        style={{ lineHeight: "2", fontSize: "0.9rem" }}
                    >
                        <li>
                            When trading at TangelTrader, STT/CTT can be a lot more than the
                            brokerage we charge. Important to keep a tab.
                        </li>
                        <li>
                            Tax by the government when transacting on the exchanges. Charged
                            on both buy and sell sides for equity delivery, and only on the
                            selling side for intraday and F&O.
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    );
}

export default Brokerage;