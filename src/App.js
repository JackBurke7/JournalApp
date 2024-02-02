// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import Logout from './components/Auth/Logout';
import JournalList from './components/Journal/JournalList';
import JournalCreate from './components/Journal/JournalCreate';
import JournalUpdate from './components/Journal/JournalUpdate';
import JournalView from './components/Journal/JournalView';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/journal" element={<JournalList />} />
        <Route path="/create" element={<JournalCreate />} />
        <Route path="/update/:id" element={<JournalUpdate />} />
        <Route path="/view/:id" element={<JournalView />} />
      </Routes>
    </Router>
  );
}
export default App;