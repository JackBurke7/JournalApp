import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const JournalCreate = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleCreate = async () => {
    try {
      if (step === 1) {
        if (title.trim() === '') {
          setError('Title is required');
          return;
        }
        setStep(2);
      } else if (step === 2) {
        if (content.trim() === '') {
          setError('Content is required');
          return;
        }

        await axios.post('http://localhost:3001/create', { title, content });

        navigate('/journal');

        setTitle('');
        setContent('');
        setError('');
        setStep(1);
      }
    } catch (error) {
      console.error('Error creating journal:', error);
      setError('Error creating journal. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create Journal</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Journal Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      {step === 2 && (
        <div className="mb-3">
          <textarea
            className="form-control"
            placeholder="Journal Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      )}
      <button className="btn btn-primary" onClick={handleCreate}>
        {step === 1 ? 'Next' : 'Create'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default JournalCreate;