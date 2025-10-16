import React, { useState } from "react";
import axios from "axios";

export default function CsvUpload() {
  const [file, setFile] = useState();
  const [message, setMessage] = useState("");
  const [distributed, setDistributed] = useState();

  const handleFileChange = e => setFile(e.target.files[0]);
  const handleUpload = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/lists/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );
      setDistributed(res.data);
      setMessage("File uploaded & lists distributed");
    } catch {
      setMessage("Upload failed");
    }
  };

  return (
    <div>
      <form onSubmit={handleUpload}>
        <input type="file" accept=".csv,.xlsx,.xls" onChange={handleFileChange} required />
        <button type="submit">Upload & Distribute</button>
      </form>
      <div>{message}</div>
      {distributed &&
        distributed.map((list, idx) => (
          <div key={idx}>
            <h4>Agent {list.agentName}</h4>
            <ul>
              {list.items.map((item, i) => (
                <li key={i}>{item.firstName} - {item.phone}</li>
              ))}
            </ul>
          </div>
        ))
      }
    </div>
  );
}
