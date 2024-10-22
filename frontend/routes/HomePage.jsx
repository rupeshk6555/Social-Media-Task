import React from "react";
import UserForm from "../components/UserForm";
import "../styles/UserForm.css";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <h1>User Submission Form</h1>
      <div className="user-create">
        <Link to="/dashboard">Admin Dashboard</Link>
      </div>
      <UserForm />
    </div>
  );
};

export default HomePage;
