// Admin.js

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Admin.css'; // Import CSS file for Admin component styling

function Admin() {
  return (
    <div className="admin-container">
      <div className="admin-greeting">Hi Admin, ksvreddy</div>
      <div className="button-container">
      <Link to="/add-question">
        <button className="add-quiz-button">Add Quiz</button>
      </Link>
      <Link to="/userdata">
        <button className="add-quiz-button">User Applied</button>
      </Link>
      </div>
    </div>
  );
}

export default Admin;
