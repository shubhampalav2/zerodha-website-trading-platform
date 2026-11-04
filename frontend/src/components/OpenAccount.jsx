import { useNavigate } from "react-router-dom";
export default function OpenAccount() {
    const navigate = useNavigate();
    return <div className="container mt-5">
        <div className="row">
            <div className="col-12 text-center">
                <h2 className="fs-2">Open a TangelTrader account</h2>
                <p className="text-muted fs-5 mt-3">Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and F&O trades.</p>
                <button className="btn btn-primary signup-btn p-2 fs-5 mb-4" onClick={() => {
                    navigate('/signup');
                }}>Sign up for free</button>
            </div>

        </div>
    </div>
}