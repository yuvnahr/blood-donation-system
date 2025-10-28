import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">🩸 Blood Donation System</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link" to="/">Dashboard</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/donors">Donors</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/recipients">Recipients</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/inventory">Inventory</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/add-donation">Add Donation</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/issue-blood">Issue Blood</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
