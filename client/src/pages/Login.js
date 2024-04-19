import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import '../styles/Login.css';

function Login() {    

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/login", { email, password })
        .then(result => {
            console.log(result);
            if(result.data.message === "Success" && email === "abcd@gmail.com"){
                navigate("/admin");
            } else if (result.data.message === "Success") {
                navigate("/form");
            } else {
                alert("Invalid credentials or user not registered.");
            }
       
        })
        .catch(err => console.log(err));
    }

    return (
        <div className="login-container">
      <div className="login-form">
        <h2 className="login-heading">Login</h2>
        <form onSubmit={handleSubmit} className="loginform">
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Enter Password"
              autoComplete="off"
              name="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Login
          </button>
          <p className="login-signup-link">
          Don't have an account? <Link to="/signup" className="signup-link">Sign Up</Link>
        </p>
        </form>
        
      </div>
    </div>
    );
}

export default Login;
