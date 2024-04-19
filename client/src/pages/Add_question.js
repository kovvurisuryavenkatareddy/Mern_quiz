import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AddQuestion.css';
import { MdDelete } from "react-icons/md";


function Add_question() {
  const [title, setTitle] = useState('');
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(Array(4).fill(''));
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState('');
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Fetch questions when the component mounts
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/quiz/Math Quiz`);
        // Set the correctOption property for each question
        const updatedQuestions = response.data.map(question => ({
          ...question,
          correctOption: question.options.indexOf(question.correctAnswer)
        }));
        setQuestions(updatedQuestions);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchQuestions();
  }, []); // Empty dependency array to ensure the effect runs only once on mount

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/add-question', {
        title,
        question,
        options,
        correctAnswer: options[correctAnswerIndex] // Sending the value of the correct answer instead of index
      });
      console.log(response.data); // Assuming the response contains some confirmation message
      // Optionally, you can redirect the user to another page after successful submission
    } catch (error) {
      console.error(error);
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleCorrectAnswerChange = (e) => {
    setCorrectAnswerIndex(parseInt(e.target.value));
  };

  const handleDeleteQuestion = async (questionId) => {
    try {
      const response = await axios.delete(`http://localhost:3001/quiz/${questionId}`);
      console.log(response.data); // Assuming the response contains some confirmation message
      // Remove the deleted question from the state
      setQuestions(questions.filter(q => q._id !== questionId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <body>
    <div className='background'>
      <h2>Add Question</h2>
      <form onSubmit={handleSubmit} className='add-question-form'>
        <div>
          <input className='lable-title' type="text" placeholder='Enter Title' value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <input className='question' type="text" placeholder='Enter the Question' value={question} onChange={(e) => setQuestion(e.target.value)} />
        </div>
        <div className="options-container">
          <label className='options'>Options:</label>
          {options.map((option, index) => (
            <input
              key={index}
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
            />
          ))}
        </div>
        <div className='correct'>
          <label>Correct Answer:</label>
          <select value={correctAnswerIndex} onChange={handleCorrectAnswerChange}>
            {options.map((option, index) => (
              <option key={index} value={index}>Option {index + 1}</option>
            ))}
          </select>
        </div>
        <button className='button' type="submit"><p className='text'>Submit</p></button>
      </form>
      <div className="add-container">
        <div className='add-title'>
          <h3>Questions Added:</h3>
        </div>
        <div className="question-list">
        <ol>
          {questions.map((q, index) => (
            <li key={index} className="question-item">
              <div>{q.question}</div>
              <div>
                Options: {q.options.join(', ')}
              </div>
              <div>
                Correct Answer: {q.options[q.correctOption]}
              </div>  
              <MdDelete className="delete-icon" onClick={() => handleDeleteQuestion(q._id)}/>
            </li>
          ))}
        </ol>
        </div>
      </div>
    </div>
    </body>
  );
}

export default Add_question;
