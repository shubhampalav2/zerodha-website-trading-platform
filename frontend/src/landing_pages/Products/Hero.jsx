import React from "react";

function Hero() {
    return (
        <div className="container border-bottom py-5 mt-5">
            <div className="row justify-content-center">
                <div className="col-12 col-lg-10 text-center">

                    <h1 className="display-5 fw-bold">
                        Technology
                    </h1>

                    <h3 className="text-muted fs-5 mt-3">
                        Sleek, modern and intuitive trading platforms
                    </h3>

                    <p className="mt-4 mb-0">
                        Check out our{" "}
                        <a href="" className="text-decoration-none">
                            investment offerings{" "}
                            <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                        </a>
                    </p>

                </div>
            </div>
        </div>
    );
}

export default Hero;