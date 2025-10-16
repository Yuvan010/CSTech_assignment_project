import React, { useState } from "react";
import axios from "axios";

export default function AgentForm({ onAgentAdded }) {
  const [input, setInput] = useState({ name: "", email: "", mobile: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = e => setInput({ ...input, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${process.env.REACT_APP_API_URL}/agents`,
        input,
        { headers: { Authorization: token } }
      );
      setMessage("Agent added!");
      if (onAgentAdded) onAgentAdded();
    } catch (err) {
      setMessage("Error adding agent");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
      <input name="mobile" placeholder="Mobile (+CountryCode)" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Add Agent</button>
      {message && <div>{message}</div>}
    </form>
  );
}
