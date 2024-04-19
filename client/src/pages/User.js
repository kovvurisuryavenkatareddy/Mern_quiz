// User.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/User.css'

function User() {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleStartQuiz = () => {
        navigate('/quiz', { state: { username: username } });
    };

    return (
        <div className="user-container">
            <h2 className="user-heading">User</h2>
            <div className="username-input">
                <label className="username-label" htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    className="username-input-field"
                    value={username}
                    onChange={handleUsernameChange}
                />
            </div>
            <button className="start-quiz-button" onClick={handleStartQuiz}>Start Quiz</button>
        </div>
    );
}

export default User;
