import React, { useState } from "react";
import { api } from "../api";

export default function AddDonation() {
  const [form, setForm] = useState({
    donorName: "",
    hospitalName: "",
    bloodGroup: "A+",
    quantity: "",
    expiry: "",
  });

  const handleSubmit = async e => {
    e.preventDefault();
    await api.post("/procedures/donation", form);
    alert("Donation recorded successfully!");
  };

  return (
    <div>
      <h3>Add Blood Donation</h3>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" placeholder="Donor Name" onChange={e => setForm({ ...form, donorName: e.target.value })} />
        <input className="form-control mb-2" placeholder="Hospital Name" onChange={e => setForm({ ...form, hospitalName: e.target.value })} />
        <select className="form-control mb-2" onChange={e => setForm({ ...form, bloodGroup: e.target.value })}>
          {["A+","A-","B+","B-","AB+","AB-","O+","O-"].map(b => <option key={b}>{b}</option>)}
        </select>
        <input className="form-control mb-2" type="number" placeholder="Quantity (ml)" onChange={e => setForm({ ...form, quantity: e.target.value })} />
        <input className="form-control mb-2" type="date" onChange={e => setForm({ ...form, expiry: e.target.value })} />
        <button className="btn btn-primary">Add Donation</button>
      </form>
    </div>
  );
}
