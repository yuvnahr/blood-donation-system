import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Dashboard from "./pages/Dashboard";
import Donors from "./pages/Donors";
import Inventory from "./pages/Inventory";
import AddDonation from "./pages/AddDonation";
import IssueBlood from "./pages/IssueBlood";

function App() {
  return (
    <Router>
      <NavBar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/donors" element={<Donors />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/add-donation" element={<AddDonation />} />
          <Route path="/issue-blood" element={<IssueBlood />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
