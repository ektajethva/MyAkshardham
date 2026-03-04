import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./RegisterPage.css";
import logo from "../assets/Logo2.png";

export default function RegisterPage() {

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const password = e.target.password.value;

    const userData = {
      firstName,
      lastName,
      email,
      phone,
      password,
    };

    // Save to localStorage
    localStorage.setItem("user", JSON.stringify(userData));

    alert("Account Created Successfully 🙏");

    // Redirect to login
    navigate("/login");
  };

  return (
    <div className="register-wrapper">
      <div className="register-card">
        <div className="register-header">
          <img src={logo} alt="Temple Logo" className="register-logo" />
          <h1>Create Account</h1>
          <p>Join the MyAkshardham community</p>
        </div>

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="row">
            <div className="input-group">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                placeholder="Raj"
                required
              />
            </div>

            <div className="input-group">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                placeholder="Patel"
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="input-group">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              placeholder="+91 98765 43210"
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="********"
              required
            />
          </div>

          <button type="submit" className="register-btn">
            Create Account
          </button>
        </form>

        <p className="login-link">
          Already have an account?{" "}
          <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
}