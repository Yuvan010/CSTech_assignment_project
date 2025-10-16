import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [input, setInput] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setInput({ ...input, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, input);
      setMessage("Signup successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed");
    }
  };

  const containerStyle = { minHeight: "100vh", background: "linear-gradient(135deg, #06b6d4 0%, #67e8f9 50%, #3b82f6 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" };
  const cardStyle = { backgroundColor: "white", borderRadius: "24px", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)", padding: "48px", width: "100%", maxWidth: "450px" };
  const inputStyle = { width: "100%", padding: "12px 16px", borderRadius: "12px", border: "1px solid #e5e7eb", fontSize: "15px", outline: "none", boxSizing: "border-box", transition: "all 0.3s" };
  const btnStyle = { width: "100%", background: "linear-gradient(90deg, #06b6d4 0%, #0891b2 100%)", color: "white", fontWeight: "600", padding: "14px", borderRadius: "12px", border: "none", fontSize: "16px", cursor: "pointer", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)", transition: "all 0.3s" };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1 style={{ fontSize: "36px", fontWeight: "bold", color: "#1f2937", marginBottom: "8px" }}>Create Account</h1>
          <p style={{ color: "#6b7280", fontSize: "15px", lineHeight: "1.6" }}>Sign up to get started with your account</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "24px" }}>
            <label style={{ display: "block", color: "#374151", fontWeight: "600", marginBottom: "8px", fontSize: "14px" }}>Email address</label>
            <input name="email" type="email" placeholder="Enter your email" onChange={handleChange} required style={inputStyle} onFocus={(e) => { e.target.style.borderColor = "#06b6d4"; e.target.style.boxShadow = "0 0 0 3px rgba(6,182,212,0.1)"; }} onBlur={(e) => { e.target.style.borderColor = "#e5e7eb"; e.target.style.boxShadow = "none"; }} />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label style={{ display: "block", color: "#374151", fontWeight: "600", marginBottom: "8px", fontSize: "14px" }}>Password</label>
            <input name="password" type="password" placeholder="Create a password" onChange={handleChange} required style={inputStyle} onFocus={(e) => { e.target.style.borderColor = "#06b6d4"; e.target.style.boxShadow = "0 0 0 3px rgba(6,182,212,0.1)"; }} onBlur={(e) => { e.target.style.borderColor = "#e5e7eb"; e.target.style.boxShadow = "none"; }} />
          </div>

          {error && <div style={{ backgroundColor: "#fef2f2", color: "#dc2626", padding: "12px 16px", borderRadius: "12px", fontSize: "14px", marginBottom: "24px" }}>{error}</div>}
          {message && <div style={{ backgroundColor: "#f0fdf4", color: "#16a34a", padding: "12px 16px", borderRadius: "12px", fontSize: "14px", marginBottom: "24px" }}>{message}</div>}

          <button type="submit" style={btnStyle} onMouseOver={(e) => { e.target.style.background = "linear-gradient(90deg, #0891b2 0%, #0e7490 100%)"; e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 10px 15px -3px rgba(0,0,0,0.2)"; }} onMouseOut={(e) => { e.target.style.background = "linear-gradient(90deg, #06b6d4 0%, #0891b2 100%)"; e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 4px 6px -1px rgba(0,0,0,0.1)"; }}>Sign Up</button>
        </form>

        <p style={{ textAlign: "center", color: "#6b7280", marginTop: "32px", fontSize: "15px" }}>
          Already have an account? <Link to="/login" style={{ color: "#3b82f6", fontWeight: "600", textDecoration: "none" }}>Login</Link>
        </p>
      </div>
    </div>
  );
}