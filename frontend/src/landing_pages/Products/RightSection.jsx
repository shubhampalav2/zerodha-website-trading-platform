import React from "react";

function RightSection({ imageURL, productName, productDesription, learnMore }) {
    return (
        <div className="container my-5">
            <div className="row align-items-center">

                {/* Content */}
                <div className="col-12 col-lg-6 text-center text-lg-start mb-4 mb-lg-0">
                    <h1>{productName}</h1>

                    <p className="my-4">
                        {productDesription}
                    </p>

                    <a href={learnMore} className="text-decoration-none">
                        Learn More
                    </a>
                </div>

                {/* Image */}
                <div className="col-12 col-lg-6 text-center">
                    <img
                        src={imageURL}
                        alt={productName}
                        className="img-fluid"
                    />
                </div>

            </div>
        </div>
    );
}

export default RightSection;