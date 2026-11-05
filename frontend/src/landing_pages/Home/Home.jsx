import { Link } from 'react-router-dom';
import './Home.css';

const features = [
    ['↗', 'Real-time market updates', 'Follow simulated prices as they move, with live updates in your workspace.'],
    ['⌕', 'Personal watchlists', 'Keep the instruments you care about close across five custom lists.'],
    ['◫', 'Portfolio tracking', 'See holdings, investment value and returns together in one clear view.'],
    ['⇄', 'Order management', 'Create buy and sell orders and review their status at a glance.'],
    ['◈', 'Secure access', 'Sign in to a personal workspace protected by the project authentication flow.'],
    ['▤', 'Order history', 'Review previous orders and filter by their current status.'],
];

export default function Home() {
    return <main className="landing-page" id="home">
        <section className="landing-hero">
            <div className="landing-copy">
                <span className="eyebrow"><i /> A market workspace built for learning</span>
                <h1>Your markets.<br /><em>Your insights.</em><br />Your trading platform.</h1>
                <p>Explore a smarter way to track stocks, manage your portfolio and understand your investments with an intuitive trading experience.</p>
                <div className="hero-actions"><Link className="primary-cta" to="/signup">Get started <span>→</span></Link><a className="secondary-cta" href="#features">Explore features <span>↓</span></a></div>
                <div className="hero-note"><span className="note-mark">✳</span><span><b>Made for exploration</b><small>A full-stack learning and demonstration project</small></span></div>
            </div>
            <div className="market-art" aria-label="Illustration of a simulated portfolio chart">
                <div className="art-glow" />
                <div className="art-window">
                    <div className="art-window-top"><span><b /> Market snapshot</span><small>DEMO DATA</small></div>
                    <div className="art-value"><div><small>Portfolio value</small><strong>₹ 12,48,620</strong></div><span className="gain-pill">↗ 4.82%</span></div>
                    <div className="chart-meta"><span>Portfolio trend</span><span>1W　1M　3M　1Y</span></div>
                    <div className="chart-area"><div className="chart-grid"><i/><i/><i/><i/></div><svg viewBox="0 0 620 190" preserveAspectRatio="none" role="img" aria-label="Illustrative upward market trend"><defs><linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#6475ff" stopOpacity=".25"/><stop offset="1" stopColor="#6475ff" stopOpacity="0"/></linearGradient></defs><path d="M0 151 C45 142 54 159 89 133 S142 125 174 138 S225 103 266 112 S314 127 345 85 S396 97 426 77 S468 93 501 50 S542 66 570 38 S600 47 620 17 V190 H0Z" fill="url(#chartFill)"/><path d="M0 151 C45 142 54 159 89 133 S142 125 174 138 S225 103 266 112 S314 127 345 85 S396 97 426 77 S468 93 501 50 S542 66 570 38 S600 47 620 17" fill="none" stroke="#6575ff" strokeWidth="3" vectorEffect="non-scaling-stroke"/></svg></div>
                    <div className="art-legend"><span>09:30</span><span>11:00</span><span>12:30</span><span>14:00</span><span>15:30</span></div>
                    <div className="art-ticker"><span>NIFTY 50 <b>24,812.30</b><i>+0.64%</i></span><span>SENSEX <b>81,345.22</b><i>+0.48%</i></span></div>
                </div>
                <div className="floating-chip"><span>●</span> Prices updating</div>
            </div>
        </section>
        <section className="market-strip"><div className="market-strip-label"><span>MARKET PULSE</span><small>Sample values · illustrative only</small></div>{[['NIFTY 50','24,812.30','+0.64%'],['SENSEX','81,345.22','+0.48%'],['BANK NIFTY','51,206.80','−0.12%']].map(([name,value,change])=><article className="index-card" key={name}><span>{name}</span><b>{value}</b><small className={change.startsWith('−')?'negative':'positive'}>{change} today</small></article>)}</section>
        <section className="feature-section" id="features"><div className="section-intro"><span className="eyebrow">ONE WORKSPACE, CLEARER PICTURE</span><h2>Everything you need to<br />explore the markets.</h2><p>Thoughtful tools bring your market activity into focus, from the first watchlist to your latest order.</p></div><div className="feature-grid">{features.map(([icon,title,description],index)=><article className="feature-card" key={title}><span className={`feature-icon feature-icon-${index}`}>{icon}</span><h3>{title}</h3><p>{description}</p><span className="feature-arrow">↗</span></article>)}</div></section>
        <section className="steps-section"><div className="section-intro"><span className="eyebrow">GET STARTED IN THREE STEPS</span><h2>A simple path to a<br />more informed view.</h2></div><div className="steps-grid">{[['01','Create your account','Sign up to open your personal workspace.'],['02','Explore and organize','Browse stocks and build a watchlist around your interests.'],['03','Track your activity','Manage simulated orders and follow your portfolio over time.']].map(([n,title,desc])=><article key={n}><span>{n}</span><h3>{title}</h3><p>{desc}</p></article>)}</div></section>
        <section className="about-band" id="about"><div><span className="eyebrow">ABOUT TANGELTRADER</span><h2>Built to learn by building.</h2></div><p>TangelTrader is a personal development project exploring full-stack application design, portfolio data and real-time communication. It is a practical space to understand how a modern market interface comes together.</p><Link to="/about">More about the project <span>→</span></Link></section>
        <section className="landing-disclaimer">TangelTrader is a personal development and demonstration project. Stock prices and trading functionality are simulated and are not connected to an actual stock exchange or brokerage service. It is not a platform for executing real financial transactions or providing investment advice.</section>
    </main>;
}
