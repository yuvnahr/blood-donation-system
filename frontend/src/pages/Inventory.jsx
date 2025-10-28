import React, { useEffect, useState } from "react";
import { api } from "../api";

export default function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [filter, setFilter] = useState("all");

  const fetchInventory = async () => {
    const res = await api.get("/inventory");
    setInventory(res.data);
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const filteredData =
    filter === "all" ? inventory : inventory.filter(i => i.status === filter);

  return (
    <div>
      <h3>Blood Inventory</h3>
      <div className="mb-3">
        <select
          className="form-select w-auto"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="available">Available</option>
          <option value="issued">Issued</option>
          <option value="expired">Expired</option>
          <option value="discarded">Discarded</option>
        </select>
      </div>

      <table className="table table-bordered table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Blood Group</th>
            <th>Quantity (ml)</th>
            <th>Hospital</th>
            <th>Donor</th>
            <th>Status</th>
            <th>Expiry</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(unit => (
            <tr key={unit.blood_unit_id}>
              <td>{unit.blood_unit_id}</td>
              <td>{unit.blood_group}</td>
              <td>{unit.quantity_ml}</td>
              <td>{unit.hospital_id}</td>
              <td>{unit.donor_id}</td>
              <td>{unit.status}</td>
              <td>{unit.expiry_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
