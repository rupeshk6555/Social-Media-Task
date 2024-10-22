import React from "react";
import AdminDashboard from "../components/AdminDashboard";
import "../styles/AdminDashboard.css";
import { Link } from "react-router-dom";

const DashboardPage = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div className="user-create">
        <Link to="/">Create New User</Link>
      </div>
      <AdminDashboard />
    </div>
  );
};

export default DashboardPage;
