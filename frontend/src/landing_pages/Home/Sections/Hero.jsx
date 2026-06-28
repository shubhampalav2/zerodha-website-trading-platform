export default function Hero() {
    function redirect() {
        window.open('https://zerodha.com/open-account', '_target');
    }
    return <div className="container p-5">
        <div className="row text-center">
            <img src="/images/homeHero.png" alt="Hero Page Image" className="mb-5 hero-img" />
            <h2 className="mt-5">Invest in everything</h2>
            <p>Online platform to invest in stocks, derivatives, mutual funds, ETFs, bonds, and more.</p>
            <button className="btn btn-primary signup-btn p-2 fs-5" onClick={redirect}>Sign up for free</button>
        </div>
    </div>
}