 

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// Import the CSS file

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://social-media-task-7xh2.onrender.com/api/users");
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to fetch users");
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="admin-dashboard">
      <div className="users-grid">
        {users.map((user) => (
          <div key={user._id} className="user-card">
            <div className="user-info">
              <h3>User Name - {user.name}</h3>
              <p>Social Handle - @{user.socialHandle}</p>
            </div>
            <div className="user-images">
              {user.images.map((imageUrl, index) => (
                <img
                  key={index}
                  src={`https://social-media-task-7xh2.onrender.com/uploads/${imageUrl}`}
                  alt={`Upload ${index + 1}`}
                  className="user-image"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
