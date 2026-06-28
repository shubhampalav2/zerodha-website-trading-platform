export default function OpenAccount() {
    return <div className="container mt-5">
        <div className="row">
            <div className="col-12 text-center">
                <h2 className="fs-2">Open a Zerodha account</h2>
                <p className="text-muted fs-5 mt-3">Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and F&O trades.</p>
                <button className="btn btn-primary signup-btn p-2 fs-5 mt-4" onClick={() => {
                    window.open("https://zerodha.com/open-account", "_blank")
                }}>Sign up for free</button>
            </div>

        </div>
    </div>
}