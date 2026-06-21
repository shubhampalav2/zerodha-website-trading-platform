import React from 'react';

const AboutPage = () => {
    return (
        <div className="about-page">
            <section className="about-hero">
                <div className="about-hero-content">
                    <h1>About Us</h1>
                    <p>Revolutionizing retail investing in India</p>
                </div>
            </section>

            <section className="about-mission">
                <div className="container">
                    <h2>Our Mission</h2>
                    <p>
                        We democratize financial investing by making it affordable, transparent, and accessible to all Indians.
                    </p>
                </div>
            </section>

            <section className="about-story">
                <div className="container">
                    <h2>Our Story</h2>
                    <p>
                        Founded with a vision to revolutionize the retail investing experience, we've grown to become India's
                        most trusted trading platform, serving millions of investors.
                    </p>
                </div>
            </section>

            <section className="about-values">
                <div className="container">
                    <h2>Our Values</h2>
                    <div className="values-grid">
                        <div className="value-card">
                            <h3>Transparency</h3>
                            <p>Complete clarity in pricing and operations</p>
                        </div>
                        <div className="value-card">
                            <h3>Innovation</h3>
                            <p>Cutting-edge technology for better trading</p>
                        </div>
                        <div className="value-card">
                            <h3>Trust</h3>
                            <p>Secure and reliable platform for all users</p>
                        </div>
                        <div className="value-card">
                            <h3>Excellence</h3>
                            <p>Best-in-class customer support and service</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="about-team">
                <div className="container">
                    <h2>Why Choose Us?</h2>
                    <ul className="features-list">
                        <li>Low brokerage charges</li>
                        <li>Fast and secure trading platform</li>
                        <li>24/7 customer support</li>
                        <li>Advanced trading tools</li>
                        <li>Educational resources</li>
                        <li>Transparent fee structure</li>
                    </ul>
                </div>
            </section>

            <section className="about-cta">
                <div className="container">
                    <h2>Join Our Community</h2>
                    <p>Start your investing journey today</p>
                    <button className="cta-button">Get Started</button>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
