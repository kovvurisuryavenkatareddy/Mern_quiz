// Quiz.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function Quiz() {
    const location = useLocation();
    const navigate = useNavigate();
    const username = location.state.username;
    
    const [questions, setQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState({});
    const [score, setScore] = useState(0);

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = () => {
        axios.get("http://localhost:3001/quiz/Math Quiz")
            .then(response => {
                setQuestions(response.data);
                setUserAnswers({});
                setScore(0);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleOptionSelect = (questionIndex, optionIndex) => {
        const updatedUserAnswers = { ...userAnswers };
        updatedUserAnswers[questionIndex] = optionIndex;
        setUserAnswers(updatedUserAnswers);
    };

    const handleSubmit = () => {
        let totalScore = 0;
        questions.forEach((question, index) => {
            const userSelectedAnswer = userAnswers[index];
            const correctAnswer = question.correctAnswer;
            if (question.options[userSelectedAnswer] === correctAnswer) {
                totalScore++;
            }
        });

        console.log("Total Score:", totalScore);

        setScore(totalScore);

        axios.post("http://localhost:3001/save-score", { name: username, score: totalScore })
            .then(response => {
                console.log("Score saved successfully:", response.data);
                // Redirect to Submit page
                navigate('/Submit');
            })
            .catch(error => {
                console.error("Failed to save score:", error);
            });
    };
    
          

    return (    
        <div>
            <h1>GCC Quiz Competition Questions</h1>
            <ol>
                {questions.map((question, questionIndex) => (
                    <li key={questionIndex}>
                        <h3>{question.question}</h3>
                        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                            {question.options.map((option, optionIndex) => (
                                <li key={optionIndex}>
                                    <input
                                        type="radio"
                                        id={`option_${questionIndex}_${optionIndex}`}
                                        name={`question_${questionIndex}`}
                                        value={optionIndex}
                                        checked={userAnswers[questionIndex] === optionIndex}
                                        onChange={() => handleOptionSelect(questionIndex, optionIndex)}
                                    />
                                    <label htmlFor={`option_${questionIndex}_${optionIndex}`}>{option}</label>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ol>
            <button onClick={handleSubmit}>Submit</button> 
        </div>
    );
}

export default Quiz;
