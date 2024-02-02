import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import JournalView from './JournalView';
import JournalUpdate from './JournalUpdate';

const JournalList = () => {
  const [journals, setJournals] = useState([]);
  const [selectedJournal, setSelectedJournal] = useState(null);

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const response = await axios.get('http://localhost:3001/journal');
        setJournals(response.data);
      } catch (error) {
        console.error('Error fetching journals:', error);
      }
    };

    fetchJournals();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/journal/${id}`);
      setJournals((prevJournals) =>
        prevJournals.filter((journal) => journal._id !== id)
      );
      setSelectedJournal(null);
    } catch (error) {
      console.error('Error deleting journal:', error);
    }
  };

  const handleUpdate = (id, updatedContent) => {
    setJournals((prevJournals) =>
      prevJournals.map((journal) =>
        journal._id === id ? { ...journal, content: updatedContent } : journal
      )
    );
    setSelectedJournal(null);
  };

  return (
    <div className="container mt-5">
      <h2>Journal List</h2>
      <div className="mb-3">
        <Link className="btn btn-primary" to="/create">
          Create New Journal
        </Link>
      </div>
      {journals.map((journal) => (
        <div key={journal._id} className="mb-3">
          {selectedJournal === journal._id ? (
            <JournalUpdate journal={journal} onUpdate={handleUpdate} />
          ) : (
            <JournalView
              journal={journal}
              onDelete={handleDelete}
              onUpdate={() => setSelectedJournal(journal._id)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default JournalList;