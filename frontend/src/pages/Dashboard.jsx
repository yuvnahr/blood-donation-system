import React, { useEffect, useState } from "react";
import { api } from "../api";

export default function Dashboard() {
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    api.get("/analytics/summary").then(res => setSummary(res.data));
  }, []);

  return (
    <div>
      <h3>Hospital Summary</h3>
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Hospital</th>
            <th>Total</th>
            <th>Available</th>
            <th>Issued</th>
            <th>Expired</th>
          </tr>
        </thead>
        <tbody>
          {summary.map(row => (
            <tr key={row.hospital_id}>
              <td>{row.hospital_name}</td>
              <td>{row.total_units}</td>
              <td>{row.available_units}</td>
              <td>{row.issued_units}</td>
              <td>{row.expired_units}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
