import React, { useState } from "react";
import '../styles/form.css';
import logo from './gcclogo.jpeg';
import logo1 from './img.jpg'

export default function Form(){
    const [name, setName] = useState('');
    const [department, setDepartment] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    
    const [showPopup, setShowPopup] = useState(false);

    const collectData = async (e) => {
        e.preventDefault();
        let result = await fetch('http://localhost:3001/create-application',{
            method: 'post',
            body: JSON.stringify({name, department, email, mobile}),
            headers: {
                'Content-Type': 'application/JSON'
            },
        });
        result = await result.json();
        localStorage.setItem('user', JSON.stringify(result));
        setShowPopup(true);
        setName('');
        setDepartment('');
        setEmail('');
        setMobile('');
        
    }

    return (
        <div>
            <div>
                <div className="header">
                    <div className="left-content">
                        <img src={logo} alt="Logo" style={{ position: 'absolute', left: 30, width:90, height: 90 }} />
                        <span><b>GCC HIRING AND ASSIGNMENT</b></span>
                    </div>
                    <div className="right-content">
                        <button>Application</button>
                        <button>About</button>
                        <button>Login</button>
                    </div>
                </div>
            </div>
            <div className="left-content">
                <img src={logo1} alt="Logo" style={{ position: 'absolute', left: 50, width:550, height: 550, top:100 }} />
            </div>
            <div className="container">
                <form onSubmit={collectData}>
                    <h2 className="text-center ">Application Form</h2><br></br>
                    <div className='mb-3 mt-3'>
                        <label className='form-label'>Name </label>
                        <input type='text' className='form-control' required
                            value={name}
                            onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className='mb-3 mt-3'>
                        <label className='form-label'>Department </label>
                        <select className='form-control' value={department} onChange={(e) => setDepartment(e.target.value)} required>
                            <option value="">Select Department</option>
                            <option value="AID">AID</option>
                            <option value="CAI">CAI</option>
                            <option value="CSM">CSM</option>
                            <option value="CYBER SECURITY">CYBER SECURITY</option>
                            <option value="CSD">CSD</option>
                        </select>
                    </div>

                    
                    <div className='mb-3'>
                        <label className='form-label'>E-mail </label>
                        <input type='email' className='form-control' required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Mobile Number </label>
                        <input type='number' className='form-control' required
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}/>
                    </div>
                    <button type='submit' style={{position:"absolute", marginLeft:120, textDecoration:"none"}}>Submit</button>
                </form>
            </div>
            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <p>Your data is submitted.</p>
                        <button onClick={() => setShowPopup(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    )
}
