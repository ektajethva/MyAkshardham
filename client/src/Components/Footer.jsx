import { MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/Logo1.png";
import temple from "../assets/Logo2.png";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* ===== BRAND (2 IMAGES ONLY) ===== */}
        <div className="footer-section">
          <div className="footer-brand">
            <img src={logo} alt="Logo" className="footer-logo" />
            <img src={temple} alt="Temple" className="footer-logo-second" />
          </div>

          <p className="footer-text">
            A divine destination for spiritual growth, devotion, and community
            service in the Swaminarayan tradition.
          </p>
        </div>

        {/* ===== QUICK LINKS ===== */}
        <div className="footer-section">
          <h4 className="footer-heading">Quick Links</h4>
          <div className="footer-links">
            <Link to="/events">Events</Link>
            <Link to="/seva">Seva</Link>
            <Link to="/shop">Temple Shop</Link>
            <Link to="/book-visit">Book Visit</Link>
            <Link to="/crowd-status">Crowd Status</Link>
            <Link to="/admin/login">Admin Portal</Link>
          </div>
        </div>

        {/* ===== CONTACT ===== */}
        <div className="footer-section">
          <h4 className="footer-heading">Contact Us</h4>
          <div className="footer-contact">
            <div className="contact-item">
              <MapPin size={16} />
              <span>Olpad Road, Kanad, Surat, Gujarat 395004</span>
            </div>
            <div className="contact-item">
              <Phone size={16} />
              <span>+91 98765 43210</span>
            </div>
            <div className="contact-item">
              <Mail size={16} />
              <span>info@myakshardham.org</span>
            </div>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 MyAkshardham. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;