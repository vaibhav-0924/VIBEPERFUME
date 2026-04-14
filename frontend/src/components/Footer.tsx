import { Globe, Mail, Phone, MapPin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <h2 className="logo">VIBE<span>PERFUME</span></h2>
          <p>Curating the world's most exquisite fragrances for the modern connoisseur.</p>
          <div className="social-links">
            <a href="#"><Globe size={20} /></a>
            <a href="#"><Globe size={20} /></a>
            <a href="#"><Globe size={20} /></a>
          </div>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Our Collections</a></li>
            <li><a href="#">Bespoke Service</a></li>
            <li><a href="#">Shipping & Returns</a></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h3>Contact Us</h3>
          <ul>
            <li><MapPin size={18} /> 123 Fragrance Lane, Grasse, France</li>
            <li><Phone size={18} /> +33 1 23 45 67 89</li>
            <li><Mail size={18} /> contact@vibeperfume.com</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; 2024 VIBE PERFUME. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
