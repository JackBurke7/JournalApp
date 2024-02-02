import React, { useState } from 'react';
import axios from 'axios';

const JournalUpdate = ({ journal, onUpdate }) => {
  const [updatedContent, setUpdatedContent] = useState(journal.content);

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3001/journal/${journal._id}`, {
        content: updatedContent,
      });

      onUpdate(journal._id, updatedContent);
    } catch (error) {
      console.error('Error updating journal:', error);
    }
  };

  return (
    <div className="border p-3 mb-3">
      <h3>Edit Journal</h3>
      <textarea
        className="form-control mb-2"
        value={updatedContent}
        onChange={(e) => setUpdatedContent(e.target.value)}
      />
      <button className="btn btn-success" onClick={handleUpdate}>
        Update
      </button>
    </div>
  );
};

export default JournalUpdate;