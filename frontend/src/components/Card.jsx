import React from "react";

/**
 * Card Component
 * -----------------
 * Props:
 *  - title (string): title text (e.g. "Total Units")
 *  - value (string | number): main statistic
 *  - subtitle (string): optional smaller label or description
 *  - color (string): optional background color (Bootstrap color keyword)
 * 
 * Example:
 *  <Card title="Available Units" value={45} color="success" />
 */

export default function Card({ title, value, subtitle, color = "primary" }) {
  return (
    <div className="col-md-3 col-sm-6 mb-3">
      <div className={`card text-white bg-${color} shadow-sm`}>
        <div className="card-body text-center">
          <h5 className="card-title fw-semibold">{title}</h5>
          <h2 className="card-text fw-bold">{value}</h2>
          {subtitle && <p className="card-subtitle small mt-2">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}
