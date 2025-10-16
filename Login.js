import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [input, setInput] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = e => setInput({ ...input, [e.target.name]: e.target.value });
  
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, input);
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #06b6d4 0%, #67e8f9 50%, #3b82f6 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px"
    }}>
      <div style={{
        backgroundColor: "white",
        borderRadius: "24px",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        padding: "48px",
        width: "100%",
        maxWidth: "450px"
      }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1 style={{
            fontSize: "36px",
            fontWeight: "bold",
            color: "#1f2937",
            marginBottom: "8px"
          }}>
            Welcome back!
          </h1>
          <p style={{ color: "#6b7280", fontSize: "15px", lineHeight: "1.6" }}>
            Please enter your email and password to access your account
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "24px" }}>
            <label style={{
              display: "block",
              color: "#374151",
              fontWeight: "600",
              marginBottom: "8px",
              fontSize: "14px"
            }}>
              Email address
            </label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "12px",
                border: "1px solid #e5e7eb",
                fontSize: "15px",
                outline: "none",
                transition: "all 0.3s",
                boxSizing: "border-box"
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#06b6d4";
                e.target.style.boxShadow = "0 0 0 3px rgba(6, 182, 212, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e5e7eb";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "8px"
            }}>
              <label style={{
                color: "#374151",
                fontWeight: "600",
                fontSize: "14px"
              }}>
                Password
              </label>
              <a href="#" style={{
                fontSize: "13px",
                color: "#3b82f6",
                textDecoration: "none"
              }}>
                forgot password
              </a>
            </div>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "12px",
                border: "1px solid #e5e7eb",
                fontSize: "15px",
                outline: "none",
                transition: "all 0.3s",
                boxSizing: "border-box"
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#06b6d4";
                e.target.style.boxShadow = "0 0 0 3px rgba(6, 182, 212, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e5e7eb";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          {error && (
            <div style={{
              backgroundColor: "#fef2f2",
              color: "#dc2626",
              padding: "12px 16px",
              borderRadius: "12px",
              fontSize: "14px",
              marginBottom: "24px"
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            style={{
              width: "100%",
              background: "linear-gradient(90deg, #06b6d4 0%, #0891b2 100%)",
              color: "white",
              fontWeight: "600",
              padding: "14px",
              borderRadius: "12px",
              border: "none",
              fontSize: "16px",
              cursor: "pointer",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s"
            }}
            onMouseOver={(e) => {
              e.target.style.background = "linear-gradient(90deg, #0891b2 0%, #0e7490 100%)";
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.2)";
            }}
            onMouseOut={(e) => {
              e.target.style.background = "linear-gradient(90deg, #06b6d4 0%, #0891b2 100%)";
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
            }}
          >
            Login
          </button>
        </form>

        <div style={{ marginTop: "24px" }}>
          <div style={{ position: "relative", marginBottom: "24px" }}>
            <div style={{
              position: "absolute",
              inset: "0",
              display: "flex",
              alignItems: "center"
            }}>
              <div style={{ width: "100%", borderTop: "1px solid #e5e7eb" }}></div>
            </div>
            <div style={{
              position: "relative",
              display: "flex",
              justifyContent: "center"
            }}>
              <span style={{
                padding: "0 16px",
                backgroundColor: "white",
                color: "#6b7280",
                fontSize: "14px"
              }}>
                
              </span>
            </div>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px"
          }}>
            
          </div>
        </div>

        <p style={{
          textAlign: "center",
          color: "#6b7280",
          marginTop: "32px",
          fontSize: "15px"
        }}>
          Don't have an account?{" "}
          <Link to="/signup" style={{
            color: "#3b82f6",
            fontWeight: "600",
            textDecoration: "none"
          }}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}