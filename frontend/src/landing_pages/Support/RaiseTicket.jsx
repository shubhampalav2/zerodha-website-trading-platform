import React from "react";

function RaiseTicket() {
    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-12 mb-5">
                    <h1 className="fs-2 fw-bold">
                        To create a ticket, select a relevant topic
                    </h1>
                </div>

                {/* Account Opening */}
                <div className="col-12 col-md-6 col-lg-4 mb-5">
                    <h4 className="mb-3">
                        <i className="fa fa-plus-circle text-primary me-2"></i>
                        Account Opening
                    </h4>

                    <a href="" className="d-block text-decoration-none mb-2">Online Account Opening</a>
                    <a href="" className="d-block text-decoration-none mb-2">Offline Account Opening</a>
                    <a href="" className="d-block text-decoration-none mb-2">Corporate / HUF Account</a>
                    <a href="" className="d-block text-decoration-none mb-2">NRI Account Opening</a>
                    <a href="" className="d-block text-decoration-none mb-2">Charges</a>
                    <a href="" className="d-block text-decoration-none">Getting Started</a>
                </div>

                {/* Your Account */}
                <div className="col-12 col-md-6 col-lg-4 mb-5">
                    <h4 className="mb-3">
                        <i className="fa fa-user-circle text-primary me-2"></i>
                        Your Account
                    </h4>

                    <a href="" className="d-block text-decoration-none mb-2">Login Issues</a>
                    <a href="" className="d-block text-decoration-none mb-2">Reset Password</a>
                    <a href="" className="d-block text-decoration-none mb-2">Update Mobile Number</a>
                    <a href="" className="d-block text-decoration-none mb-2">Update Email Address</a>
                    <a href="" className="d-block text-decoration-none mb-2">Update PAN</a>
                    <a href="" className="d-block text-decoration-none">Close Account</a>
                </div>

                {/* Funds */}
                <div className="col-12 col-md-6 col-lg-4 mb-5">
                    <h4 className="mb-3">
                        <i className="fa fa-money text-primary me-2"></i>
                        Funds
                    </h4>

                    <a href="" className="d-block text-decoration-none mb-2">Add Funds</a>
                    <a href="" className="d-block text-decoration-none mb-2">Withdraw Funds</a>
                    <a href="" className="d-block text-decoration-none mb-2">Fund Withdrawal Status</a>
                    <a href="" className="d-block text-decoration-none mb-2">UPI Payments</a>
                    <a href="" className="d-block text-decoration-none mb-2">Bank Account Verification</a>
                    <a href="" className="d-block text-decoration-none">Failed Transactions</a>
                </div>

                {/* Trading */}
                <div className="col-12 col-md-6 col-lg-4 mb-5">
                    <h4 className="mb-3">
                        <i className="fa fa-line-chart text-primary me-2"></i>
                        Trading & Markets
                    </h4>

                    <a href="" className="d-block text-decoration-none mb-2">Equity Trading</a>
                    <a href="" className="d-block text-decoration-none mb-2">Futures & Options</a>
                    <a href="" className="d-block text-decoration-none mb-2">Commodity Trading</a>
                    <a href="" className="d-block text-decoration-none mb-2">Currency Trading</a>
                    <a href="" className="d-block text-decoration-none mb-2">Trading Holidays</a>
                    <a href="" className="d-block text-decoration-none">Margin Calculator</a>
                </div>

                {/* Reports */}
                <div className="col-12 col-md-6 col-lg-4 mb-5">
                    <h4 className="mb-3">
                        <i className="fa fa-file-text text-primary me-2"></i>
                        Console & Reports
                    </h4>

                    <a href="" className="d-block text-decoration-none mb-2">Portfolio</a>
                    <a href="" className="d-block text-decoration-none mb-2">Holdings</a>
                    <a href="" className="d-block text-decoration-none mb-2">Trade Book</a>
                    <a href="" className="d-block text-decoration-none mb-2">P&L Statement</a>
                    <a href="" className="d-block text-decoration-none mb-2">Contract Notes</a>
                    <a href="" className="d-block text-decoration-none">Ledger Report</a>
                </div>

                {/* Apps */}
                <div className="col-12 col-md-6 col-lg-4 mb-5">
                    <h4 className="mb-3">
                        <i className="fa fa-mobile text-primary me-2"></i>
                        Apps & Platforms
                    </h4>

                    <a href="" className="d-block text-decoration-none mb-2">Kite Web</a>
                    <a href="" className="d-block text-decoration-none mb-2">Kite Mobile</a>
                    <a href="" className="d-block text-decoration-none mb-2">Coin</a>
                    <a href="" className="d-block text-decoration-none mb-2">Console</a>
                    <a href="" className="d-block text-decoration-none mb-2">Kite Connect APIs</a>
                    <a href="" className="d-block text-decoration-none">Downloads</a>
                </div>
            </div>
        </div>
    );
}

export default RaiseTicket;