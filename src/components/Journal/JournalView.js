import React from 'react';

const JournalView = ({ journal, onDelete, onUpdate }) => {
  return (
    <div className="border p-3 mb-3">
      <h2>{journal.title}</h2>
      <p>{journal.content}</p>
      <button
        className="btn btn-primary me-2"
        onClick={() => onUpdate(journal._id)}
      >
        Update
      </button>
      <button className="btn btn-danger" onClick={() => onDelete(journal._id)}>
        Delete
      </button>
    </div>
  );
};

export default JournalView;