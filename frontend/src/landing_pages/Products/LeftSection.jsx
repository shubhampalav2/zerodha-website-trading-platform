import React from "react";

function LeftSection({
    imageURL,
    productName,
    productDesription,
    tryDemo,
    learnMore,
    googlePlay,
    appStore,
}) {
    return (
        <div className="container my-5">
            <div className="row align-items-center">

                {/* Image */}
                <div className="col-12 col-lg-6 text-center mb-4 mb-lg-0">
                    <img
                        src={imageURL}
                        alt={productName}
                        className="img-fluid"
                    />
                </div>

                {/* Content */}
                <div className="col-12 col-lg-6 text-center text-lg-start">
                    <h1>{productName}</h1>

                    <p className="my-4">
                        {productDesription}
                    </p>

                    {/* Links */}
                    <div className="mb-4">
                        <a href={tryDemo} className="me-4 text-decoration-none">
                            Try Demo
                        </a>

                        <a href={learnMore} className="text-decoration-none">
                            Learn More
                        </a>
                    </div>

                    {/* Store Buttons */}
                    <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">
                        <a href={googlePlay}>
                            <img
                                src="/images/googlePlayBadge.svg"
                                alt="Google Play"
                                className="img-fluid"
                            />
                        </a>

                        <a href={appStore}>
                            <img
                                src="/images/appstoreBadge.svg"
                                alt="App Store"
                                className="img-fluid"
                            />
                        </a>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default LeftSection;