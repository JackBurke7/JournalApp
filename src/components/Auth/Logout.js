import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:3001/auth/logout');
      console.log('Logout successful:', response.data);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error.response.data.error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Logout</h2>
      <button type="button" className="btn btn-danger" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
