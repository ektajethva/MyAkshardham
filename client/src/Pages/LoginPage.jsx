import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";
import templeImage from "../assets/Logo2.png";

function LoginPage() {

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const storedUser = JSON.parse(localStorage.getItem("user"));

    // 🔴 If no registration done
    if (!storedUser) {
      alert("Please register first 🙏");
      navigate("/register");   // auto redirect to register
      return;
    }

    // 🟢 If email & password match
    if (email === storedUser.email && password === storedUser.password) {

      localStorage.setItem("isLoggedIn", "true");

      alert("Login Successful 🙏");

      navigate("/");  // go to Home page

    } else {
      alert("Invalid Email or Password ❌");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">

        <div className="login-header">
          <img
            src={templeImage}
            alt="Temple"
            className="login-logo"
          />
          <h1>Welcome Back</h1>
          <p>Sign in to your MyAkshardham account</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>

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
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="********"
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Sign In
          </button>

        </form>

        <p className="register-link">
          Don't have an account?{" "}
          <Link to="/register">Register</Link>
        </p>

      </div>
    </div>
  );
}

export default LoginPage;