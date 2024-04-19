import React, { useState, useEffect } from "react";
import axios from "axios";
import '../styles/userdata.css';

function UserData() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3001/get-application");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAccept = async (email) => {
    try {
      await axios.post("http://localhost:3001/api/sendemail", { email });
      console.log("Email sent to:", email);
      // Optionally, you can update the UI or display a message indicating that the email was sent successfully.
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  const handleDecline = async (id) => {
    try {
      await fetch(`http://localhost:3001/delete/${id}`, {
        method: "DELETE",
      });
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <h2>User Data</h2>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.department}</td>
                <td>{user.email}</td>
                <td>{user.mobile}</td>
                <td>
                  <button onClick={() => handleAccept(user.email)}>Accept</button>
                  <button onClick={() => handleDecline(user._id)}>Decline</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserData;