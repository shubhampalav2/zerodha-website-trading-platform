export default function Hero() {
    return <div className="container">
        <div className="row p-md-6 py-5 px-2 mt-5 mb-5">
            <h1 className="fs-2 text-center">
                Making investing more accessible
                <br />
                with clear pricing and useful technology.
            </h1>
        </div>

        <div
            className="row p-md-5 px-2 py-5 mt-5 border-top text-muted"
            style={{ lineHeight: "1.8", fontSize: "1.2em" }}
        >
            <div className="col-md-6 col-12 p-md-5">
                <p>
                    TangelTrader is built to make trading and investing more accessible, with
                    straightforward tools that help people navigate the markets.
                </p>
                <p>
                    Our platform brings market information and trading tools together in one place.
                </p>
                <p>
                    We aim to give investors a clear, dependable experience as they explore and
                    manage their investments.
                </p>
            </div>
            <div className="col-md-6 col-12 p-md-5">
                <p>
                    In addition, we run a number of popular open online educational and
                    community initiatives to empower retail traders and investors.
                </p>
                <p>
                    TangelTrader focuses on building practical tools for traders and investors.
                </p>
                <p>
                    And yet, we are always up to something new every day. Catch up on
                    the latest updates on our blog or see what the media is saying about
                    us.
                </p>
            </div>
        </div>
    </div>
}