import React from "react";
import { useNavigate } from "react-router-dom";
import AgentForm from "../components/AgentForm";
import AgentList from "../components/AgentList";
import CsvUpload from "../components/CsvUpload";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const containerStyle = { minHeight: "100vh", background: "linear-gradient(135deg, #06b6d4 0%, #67e8f9 50%, #3b82f6 100%)", padding: "20px" };
  const headerStyle = { maxWidth: "1200px", margin: "0 auto 32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", backgroundColor: "white", padding: "24px 32px", borderRadius: "16px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" };
  const cardStyle = { backgroundColor: "white", borderRadius: "16px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)", padding: "32px", maxWidth: "1200px", margin: "0 auto 24px" };
  const titleStyle = { fontSize: "32px", fontWeight: "bold", color: "#1f2937", margin: "0" };
  const sectionTitleStyle = { fontSize: "20px", fontWeight: "600", color: "#374151", marginBottom: "20px", paddingBottom: "8px", borderBottom: "3px solid #06b6d4" };
  const btnStyle = { background: "linear-gradient(90deg, #ef4444 0%, #dc2626 100%)", color: "white", border: "none", borderRadius: "12px", padding: "12px 24px", cursor: "pointer", fontWeight: "600", fontSize: "14px", transition: "all 0.3s", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Dashboard</h1>
        <button onClick={handleLogout} style={btnStyle} onMouseOver={(e) => { e.target.style.background = "linear-gradient(90deg, #dc2626 0%, #b91c1c 100%)"; e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 4px 8px rgba(0,0,0,0.15)"; }} onMouseOut={(e) => { e.target.style.background = "linear-gradient(90deg, #ef4444 0%, #dc2626 100%)"; e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)"; }}>
          Logout
        </button>
      </div>

      <div style={cardStyle}>
        <h3 style={sectionTitleStyle}>Add Agent</h3>
        <AgentForm />
      </div>

      <div style={cardStyle}>
        <h3 style={sectionTitleStyle}>Agents</h3>
        <AgentList />
      </div>

      <div style={cardStyle}>
        <h3 style={sectionTitleStyle}>Upload & Distribute List</h3>
        <CsvUpload />
      </div>
    </div>
  );
}