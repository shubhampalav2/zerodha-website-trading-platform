import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom';
import Home from './landing_pages/Home/Home';
import PricingPage from './landing_pages/Pricing/PricingPage';
import Products from './landing_pages/Products/ProductPage';
import SupportPage from './landing_pages/Support/SupportPage';
import SignupPage from './landing_pages/Signup/SignupPage';
import AboutPage from './landing_pages/About/AboutPage';
import NotFound from './components/NotFound';
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/charges' element={<PricingPage />} />
        <Route path='/products' element={<Products />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/support' element={<SupportPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
