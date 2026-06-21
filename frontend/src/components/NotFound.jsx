import { useNavigate } from "react-router-dom";
import "./NotFound.css";
export default function NotFound() {
    const navigate = useNavigate();
    const handleRedirect = () => {
        navigate('/');
    }
    return <div className="notfound-page">
        <div className="notfound-container">

            {/* Error Code */}
            <p className="error-code">404</p>

            {/* Heading */}
            <h1 className="title">
                Kiaan couldn’t find that page
            </h1>

            {/* Description */}
            <p className="description">
                We couldn’t find the page you were looking for.
            </p>

            {/* CTA */}
            <button
                className="home-link"
                onClick={handleRedirect}
            >
                Visit Zerodha's home page
            </button>

        </div>
    </div>
}