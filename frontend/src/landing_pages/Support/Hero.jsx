import React from "react";

function Hero() {
    return (
        <section className="container-fluid p-5 mt-5" style={{ background: "#eef5ff", color: "black" }}>
            <div className="container">

                {/* Header */}
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-5">
                    <h2 className="fw-bold mb-3 mb-md-0">
                        Support Portal
                    </h2>

                    <a
                        href=""
                        className="btn btn-light text-primary fw-semibold"
                    >
                        Track Tickets
                    </a>
                </div>

                <div className="row g-5 align-items-start">

                    {/* Left Section */}
                    <div className="col-12 col-lg-7">

                        <h3 className="mb-4">
                            Search for an answer or browse help topics to create a ticket
                        </h3>

                        <div className="input-group mb-4">
                            <span className="input-group-text bg-white">
                                <i className="fa fa-search"></i>
                            </span>

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Eg. How do I activate F&O?"
                            />
                        </div>

                        <div className="row g-3">

                            <div className="col-6 col-md-3">
                                <a href="" className="text-decoration-none">
                                    Track account opening
                                </a>
                            </div>

                            <div className="col-6 col-md-3">
                                <a href="" className="text-decoration-none">
                                    Track segment activation
                                </a>
                            </div>

                            <div className="col-6 col-md-3">
                                <a href="" className="text-decoration-none">
                                    Intraday margins
                                </a>
                            </div>

                            <div className="col-6 col-md-3">
                                <a href="" className="text-decoration-none">
                                    Kite user manual
                                </a>
                            </div>

                        </div>

                    </div>

                    {/* Right Section */}

                    <div className="col-12 col-lg-5">

                        <div className="card shadow border-0">
                            <div className="card-body">

                                <h3 className="mb-4 text-dark">
                                    Featured
                                </h3>

                                <ol className="mb-0">

                                    <li className="mb-3">
                                        <a
                                            href=""
                                            className="text-decoration-none"
                                        >
                                            Current Takeovers and Delisting - January 2024
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            href=""
                                            className="text-decoration-none"
                                        >
                                            Latest Intraday Leverages - MIS & CO
                                        </a>
                                    </li>

                                </ol>

                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}

export default Hero;