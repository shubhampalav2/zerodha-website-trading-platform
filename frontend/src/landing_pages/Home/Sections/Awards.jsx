export default function Awards() {
    return <div className="container mt-5 mx-auto">
        <div className="row">
            <div className="col-12 col-lg-6 p-5 text-center">
                <img src="/images/largestBroker.svg" alt="Largest Broker" className="broker-img" />
            </div>
            <div className="col-12 col-lg-6 mt-4 p-5 text-center">
                <h2>Largest stock broker in India</h2>
                <p>2+ million Zerodha clients contribute to over 15% of all retail
                    order volumes in India daily by trading and investing in:</p>
                <div className="row">
                    <div className="col-6">
                        <ul>
                            <li>
                                <p>Futures and Options</p>
                            </li>
                            <li>
                                <p>Commodity derivatives</p>
                            </li>
                            <li>
                                <p>Currency derivatives</p>
                            </li>
                        </ul>
                    </div>
                    <div className="col-6">
                        <ul>
                            <li>
                                <p>Stocks & IPOs</p>
                            </li>
                            <li>
                                <p>Direct mutual funds</p>
                            </li>
                            <li>
                                <p>Bonds and Govt. Securities</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <img src="/images/pressLogos.png" style={{ width: "90%" }} alt="Press Logos" />
            </div>
        </div>
    </div>
}