const LoginForm = ({ setAuthMode, mainRef }) => {
    return <div className="auth-container">
        <div className="auth-card">
            <h2 className="auth-title">Login</h2>
            <p className="auth-subtitle">
                Access your Zerodha trading account
            </p>

            <form>
                <div className="form-group">
                    <label htmlFor="emailField">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter your email"
                        autoComplete="off"
                        id="emailField"
                    />
                </div>

                <div className="form-group mt-3">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter your password"
                        id="password"
                    />
                </div>

                <button className="btn auth-btn mt-4">
                    Login
                </button>
            </form>

            <div className="text-center mt-4">
                <p className="mb-2">
                    New to Zerodha?
                </p>

                <button
                    className="btn btn-link text-decoration-none"
                    onClick={() => {
                        setAuthMode("signup");
                        mainRef?.current?.scrollIntoView({ behaviour: "smooth" })
                    }}
                >
                    Create Account
                </button>
            </div>
        </div>
    </div>
}
export default LoginForm;