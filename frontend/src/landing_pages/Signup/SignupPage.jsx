import React, { useState, useEffect, useRef } from "react";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import "./auth.css";
const SignupPage = () => {
    const [authMode, setAuthMode] = useState('login');
    const mainRef = useRef(null);

    useEffect(() => {
        if (mainRef?.current) {
            mainRef?.current?.scrollIntoView({
                behaviour: "smooth"
            })
        }
    }, []);

    return (
        <main className="signup-page mt-5 p-5" ref={mainRef}>
            {authMode === 'signup' ?
                <SignupForm setAuthMode={setAuthMode} mainRef={mainRef} />
                : <LoginForm setAuthMode={setAuthMode} mainRef={mainRef} />}
        </main>
    );
};

export default SignupPage;
