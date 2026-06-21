import React from 'react';

const SupportPage = () => {
  return (
    <main className="support-page">
      <section className="support-page__hero">
        <h1>Support</h1>
        <p>Need help? We're here for you.</p>
      </section>

      <section className="support-page__options">
        <div className="support-card">
          <h2>Contact Us</h2>
          <p>Email support@zerodha.com or call 1800-XXX-XXXX.</p>
        </div>

        <div className="support-card">
          <h2>FAQs</h2>
          <p>Find answers to common questions.</p>
        </div>
      </section>
    </main>
  );
};

export default SupportPage;
