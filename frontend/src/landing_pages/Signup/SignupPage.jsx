import React from "react";

const SignupPage = () => {
    return (
        <main className="signup-page">
            <section className="signup-page__container">
                <h1 className="signup-page__title">Create your account</h1>
                <p className="signup-page__subtitle">
                    Sign up to start trading and manage your portfolio.
                </p>

                <form className="signup-page__form">
                    <label className="signup-page__label" htmlFor="name">
                        Full name
                    </label>
                    <input
                        className="signup-page__input"
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter your name"
                    />

                    <label className="signup-page__label" htmlFor="email">
                        Email address
                    </label>
                    <input
                        className="signup-page__input"
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                    />

                    <label className="signup-page__label" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="signup-page__input"
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Choose a password"
                    />

                    <button className="signup-page__button" type="submit">
                        Sign up
                    </button>
                </form>
            </section>
        </main>
    );
};

export default SignupPage;
