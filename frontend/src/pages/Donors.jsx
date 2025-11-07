// frontend/src/pages/Donors.jsx
import React, { useEffect, useState } from "react";
import { api } from "../api";

export default function Donors() {
  const [donors, setDonors] = useState([]);
  const [form, setForm] = useState({
    name: "",
    contact: "",
    dob: "",
    weight: "",
    hemoglobin: "",
    is_first_time: 1,
    blood_group: "A+",
  });

  const fetchDonors = async () => {
    const res = await api.get("/donors");
    setDonors(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/donors", form);
      alert("✅ Donor added successfully!");
      setForm({
        name: "",
        contact: "",
        dob: "",
        weight: "",
        hemoglobin: "",
        is_first_time: 1,
        blood_group: "A+",
      });
      fetchDonors();
    } catch (err) {
      alert(err.response?.data?.error || "Something went wrong!");
    }
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  return (
    <div>
      <h3>Donors List</h3>

      {/* ✅ Donor Table */}
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Blood Group</th>
            <th>Age</th>
            <th>Weight</th>
            <th>Hemoglobin</th>
            <th>1st Time?</th>
          </tr>
        </thead>
        <tbody>
          {donors.map((d) => (
            <tr key={d.donor_id}>
              <td>{d.name}</td>
              <td>{d.blood_group}</td>
              <td>{d.age}</td>
              <td>{d.weight} kg</td>
              <td>{d.hemoglobin} g/dL</td>
              <td>{d.is_first_time ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ Add Donor Form */}
      <h4 className="mt-4">Register Donor</h4>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" placeholder="Name"
          value={form.name} onChange={(e)=>setForm({...form, name: e.target.value})} />

        <input className="form-control mb-2" placeholder="Contact"
          value={form.contact} onChange={(e)=>setForm({...form, contact: e.target.value})} />

        <input className="form-control mb-2" placeholder="Date of Birth" type="date"
          value={form.dob} onChange={(e)=>setForm({...form, dob: e.target.value})} />

        <input className="form-control mb-2" placeholder="Weight (kg)" type="number"
          value={form.weight} onChange={(e)=>setForm({...form, weight: e.target.value})} />

        <input className="form-control mb-2" placeholder="Hemoglobin (g/dL)" type="number" step="0.1"
          value={form.hemoglobin} onChange={(e)=>setForm({...form, hemoglobin: e.target.value})} />

        {/* ✅ Yes/No radio buttons */}
        <label><strong>First-time Donor?</strong></label>
        <div className="mb-2">
          <label className="me-2">
            <input type="radio" checked={form.is_first_time === 1}
              onChange={()=>setForm({...form, is_first_time: 1})} /> Yes
          </label>
          <label>
            <input type="radio" checked={form.is_first_time === 0}
              onChange={()=>setForm({...form, is_first_time: 0})} /> No
          </label>
        </div>

        {/* Blood group dropdown */}
        <select className="form-control mb-3"
          value={form.blood_group}
          onChange={(e)=>setForm({...form, blood_group: e.target.value})}>
          {["A+","A-","B+","B-","AB+","AB-","O+","O-"].map(bg => (
            <option key={bg}>{bg}</option>
          ))}
        </select>

        <button className="btn btn-primary w-100">Add Donor</button>
      </form>
    </div>
  );
}
