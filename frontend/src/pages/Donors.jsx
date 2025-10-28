import React, { useEffect, useState } from "react";
import { api } from "../api";

export default function Donors() {
  const [donors, setDonors] = useState([]);
  const [form, setForm] = useState({
    name: "",
    contact: "",
    dob: "",
    blood_group: "A+",
  });

  const fetchDonors = async () => {
    const res = await api.get("/donors");
    setDonors(res.data);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await api.post("/donors", form);
    setForm({ name: "", contact: "", dob: "", blood_group: "A+" });
    fetchDonors();
    alert("Donor added successfully!");
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  return (
    <div>
      <h3>Donors List</h3>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact</th>
            <th>Blood Group</th>
            <th>Date of Birth</th>
          </tr>
        </thead>
        <tbody>
          {donors.map(d => (
            <tr key={d.donor_id}>
              <td>{d.name}</td>
              <td>{d.contact}</td>
              <td>{d.blood_group}</td>
              <td>{d.dob}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4 className="mt-4">Add New Donor</h4>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          placeholder="Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="form-control mb-2"
          placeholder="Contact"
          value={form.contact}
          onChange={e => setForm({ ...form, contact: e.target.value })}
        />
        <input
          className="form-control mb-2"
          type="date"
          value={form.dob}
          onChange={e => setForm({ ...form, dob: e.target.value })}
        />
        <select
          className="form-control mb-3"
          value={form.blood_group}
          onChange={e => setForm({ ...form, blood_group: e.target.value })}
        >
          {["A+","A-","B+","B-","AB+","AB-","O+","O-"].map(bg => (
            <option key={bg}>{bg}</option>
          ))}
        </select>
        <button className="btn btn-primary">Add Donor</button>
      </form>
    </div>
  );
}
