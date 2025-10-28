import React, { useState } from "react";
import { api } from "../api";

export default function IssueBlood() {
  const [form, setForm] = useState({ recipientName: "", bloodGroup: "A+", amount: "" });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post("/procedures/issue", form);
      alert("Blood issued successfully!");
    } catch (err) {
      alert("Error: " + err.response.data.error);
    }
  };

  return (
    <div>
      <h3>Issue Blood</h3>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" placeholder="Recipient Name" onChange={e => setForm({ ...form, recipientName: e.target.value })} />
        <select className="form-control mb-2" onChange={e => setForm({ ...form, bloodGroup: e.target.value })}>
          {["A+","A-","B+","B-","AB+","AB-","O+","O-"].map(b => <option key={b}>{b}</option>)}
        </select>
        <input className="form-control mb-2" type="number" placeholder="Amount (₹)" onChange={e => setForm({ ...form, amount: e.target.value })} />
        <button className="btn btn-success">Issue Blood</button>
      </form>
    </div>
  );
}
