import { Link } from "react-router-dom";

export default function Home() {
  const containerStyle = { minHeight: "100vh", background: "linear-gradient(135deg, #06b6d4 0%, #67e8f9 50%, #3b82f6 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px" };
  const cardStyle = { backgroundColor: "white", borderRadius: "24px", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)", padding: "48px", maxWidth: "600px", textAlign: "center" };
  const btnStyle = { display: "inline-block", padding: "12px 32px", borderRadius: "12px", fontWeight: "600", textDecoration: "none", margin: "0 8px", transition: "all 0.3s" };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={{ fontSize: "42px", fontWeight: "bold", color: "#1f2937", marginBottom: "16px" }}>
          Home page of CStech Assignment
        </h1>
        <p style={{ fontSize: "18px", color: "#6b7280", marginBottom: "32px", lineHeight: "1.6" }}>
          Manage your agents and distribute lists - by yuvan
        </p>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/login" style={{ ...btnStyle, background: "linear-gradient(90deg, #06b6d4 0%, #0891b2 100%)", color: "white" }}>
            Login
          </Link>
          <Link to="/signup" style={{ ...btnStyle, border: "2px solid #06b6d4", color: "#06b6d4", backgroundColor: "white" }}>
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}