import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'; // Add this line for Tailwind CSS
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Use createRoot
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
