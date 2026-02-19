import React, { useState } from 'react';

function FeedbackForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'general',
    message: ''
  });
  const [alert, setAlert] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Store in localStorage (temporary until backend is ready)
    const feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
    feedbacks.push({ ...formData, id: Date.now(), date: new Date().toISOString() });
    localStorage.setItem('feedbacks', JSON.stringify(feedbacks));

    setAlert({ type: 'success', message: 'Feedback submitted successfully!' });
    setFormData({ name: '', email: '', type: 'general', message: '' });
    
    setTimeout(() => setAlert(null), 3000);
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Submit Your Feedback</h2>
        {alert && <div className={`alert alert-${alert.type}`}>{alert.message}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name *</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Email *</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Feedback Type *</label>
            <select name="type" value={formData.type} onChange={handleChange} required>
              <option value="general">General</option>
              <option value="suggestion">Suggestion</option>
              <option value="complaint">Complaint</option>
            </select>
          </div>

          <div className="form-group">
            <label>Message *</label>
            <textarea name="message" value={formData.message} onChange={handleChange} required />
          </div>

          <button type="submit">Submit Feedback</button>
        </form>
      </div>
    </div>
  );
}

export default FeedbackForm;
