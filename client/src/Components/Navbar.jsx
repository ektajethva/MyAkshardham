import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/Logo1.png";
import temple from "../assets/Logo3.png";
import "./Navbar.css";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Events", path: "/events" },
  { label: "Seva", path: "/seva" },
  { label: "Shop", path: "/shop" },
  { label: "Crowd Status", path: "/crowd-status" },
  { label: "Donate", path: "/donation" },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const handleClose = () => setOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">

        <Link to="/" className="logo" onClick={handleClose}>
          <img src={logo} alt="Logo" className="logo-img" />
          <img src={temple} alt="Temple" className="logo-img-second" />
        </Link>

        <div className="nav-links">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={
                location?.pathname === link.path
                  ? "nav-item active"
                  : "nav-item"
              }
            >
              {link.label}
            </Link>
          ))}

          <Link to="/login" className="btn outline">Login</Link>
          <Link to="/register" className="btn primary">Register</Link>
          <Link to="/admin/login" className="admin-link">Admin</Link>
        </div>

        <button
          className="mobile-toggle"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;