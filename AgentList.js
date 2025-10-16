import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AgentList() {
  const [agents, setAgents] = useState([]);
  useEffect(() => {
    const fetchAgents = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/agents`,
        { headers: { Authorization: token } }
      );
      setAgents(res.data);
    };
    fetchAgents();
  }, []);

  return (
    <ul>
      {agents.map(agent => (
        <li key={agent._id}>
          {agent.name} - {agent.email} - {agent.mobile}
        </li>
      ))}
    </ul>
  );
}
