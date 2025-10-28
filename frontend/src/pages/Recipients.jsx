import React, { useEffect, useState } from "react";
import { api } from "../api";

export default function Recipients() {
  const [recipients, setRecipients] = useState([]);
  const [form, setForm] = useState({
    name: "",
    contact: "",
    hospitalName: "",
    blood_group: "A+",
  });

  const fetchRecipients = async () => {
    const res = await api.get("/recipients");
    setRecipients(res.data);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await api.post("/recipients", form);
    setForm({ name: "", contact: "", hospitalName: "", blood_group: "A+" });
    fetchRecipients();
    alert("Recipient registered successfully!");
  };

  useEffect(() => {
    fetchRecipients();
  }, []);

  return (
    <div>
      <h3>Recipients</h3>
      <table className="table table-hover mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact</th>
            <th>Hospital</th>
            <th>Blood Group</th>
          </tr>
        </thead>
        <tbody>
          {recipients.map(r => (
            <tr key={r.recipient_id}>
              <td>{r.name}</td>
              <td>{r.contact}</td>
              <td>{r.hospital_id}</td>
              <td>{r.blood_group}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4 className="mt-4">Register Recipient</h4>
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
          placeholder="Hospital Name"
          value={form.hospitalName}
          onChange={e => setForm({ ...form, hospitalName: e.target.value })}
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
        <button className="btn btn-success">Register</button>
      </form>
    </div>
  );
}
