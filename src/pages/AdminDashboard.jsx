import React, { useState, useEffect } from 'react';

function AdminDashboard() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadFeedbacks();
  }, []);

  const loadFeedbacks = () => {
    const data = JSON.parse(localStorage.getItem('feedbacks') || '[]');
    setFeedbacks(data.reverse());
  };

  const filteredFeedbacks = filter === 'all' 
    ? feedbacks 
    : feedbacks.filter(f => f.type === filter);

  const handleDelete = (id) => {
    const updated = feedbacks.filter(f => f.id !== id);
    localStorage.setItem('feedbacks', JSON.stringify(updated.reverse()));
    loadFeedbacks();
  };

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>
      
      <div className="filter-bar">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All Feedback</option>
          <option value="general">General</option>
          <option value="suggestion">Suggestion</option>
          <option value="complaint">Complaint</option>
        </select>
        <button onClick={loadFeedbacks}>Refresh</button>
      </div>

      <div className="feedback-list">
        {filteredFeedbacks.length === 0 ? (
          <div className="card">No feedback found.</div>
        ) : (
          filteredFeedbacks.map(feedback => (
            <div key={feedback.id} className="feedback-item">
              <div className="feedback-header">
                <span className="feedback-name">{feedback.name}</span>
                <span className="feedback-date">
                  {new Date(feedback.date).toLocaleDateString()}
                </span>
              </div>
              <span className={`feedback-type type-${feedback.type}`}>
                {feedback.type.toUpperCase()}
              </span>
              <p><strong>Email:</strong> {feedback.email}</p>
              <p className="feedback-message">{feedback.message}</p>
              <button onClick={() => handleDelete(feedback.id)} style={{marginTop: '10px', background: '#e74c3c'}}>
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
