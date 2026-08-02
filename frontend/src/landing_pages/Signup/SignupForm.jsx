const SignupForm = ({ setAuthMode, mainRef }) => {
    return <div className="auth-container">
        <div className="auth-card">
            <h2 className="auth-title">Create Account</h2>
            <p className="auth-subtitle">
                Start your investment journey with Zerodha
            </p>

            <form>
                <div className="mb-3">
                    <label className="form-label" htmlFor="name">Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your full name"
                        id="name"
                        autoComplete="off"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter your email"
                        id="email"
                        autoComplete="off"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor="number">Mobile Number</label>
                    <input
                        type="tel"
                        className="form-control"
                        placeholder="Enter your mobile number"
                        id="number"
                        autoComplete="off"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Create a password"
                        id="password"
                        autoComplete="off"
                    />
                </div>

                <div className="mb-4">
                    <label className="form-label" htmlFor="conformPassword">Confirm Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Confirm your password"
                        id="conformPassword"
                        autoComplete="off"
                    />
                </div>

                <button type="submit" className="btn auth-btn">
                    Create Account
                </button>
            </form>

            <div className="text-center mt-4">
                <p className="mb-2 text-muted">
                    Already have an account?
                </p>

                <button
                    type="button"
                    className="btn btn-link text-decoration-none p-0"
                    onClick={() => {
                        setAuthMode("login");
                        mainRef?.current?.scrollIntoView({
                            behaviour: "smooth"
                        })
                    }}
                >
                    Login
                </button>
            </div>
        </div>
    </div>
}
export default SignupForm;