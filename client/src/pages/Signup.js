import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import '../styles/Signup.css';

function Signup() {    

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:3001/register", { name, email, password })
        .then(result => {console.log(result)
        navigate("/")
        })
        .catch(err => console.log(err))
    }


  return (
    <div className="sign-container">
            <div className="signup-form">
                <h2 className="signup-heading">Sign Up</h2>
                <form onSubmit={handleSubmit} className="signupform">
                    <div className="mb-3">
                        <input type="text" 
                        placeholder='Enter Name' 
                        autoComplete='off' 
                        name='name' 
                        className='form-control'
                        onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <input type="text" 
                        placeholder='Enter Email' 
                        autoComplete='off' 
                        name='email' 
                        className='form-control' 
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <input type="password" 
                        placeholder='Enter Password' 
                        name='password' 
                        className='form-control' 
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn">
                        Sign Up
                    </button>
                    <div className="link">
                        <p>Already have an account? <Link to="/" className="login-button">Login</Link></p>
                    </div>
                </form>
            </div>
        </div>
  );
}

export default Signup;