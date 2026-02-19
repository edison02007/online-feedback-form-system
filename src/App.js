import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FeedbackForm from './pages/FeedbackForm';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <nav>
        <div className="container">
          <h1>Feedback System</h1>
          <div>
            <Link to="/">Submit Feedback</Link>
            <Link to="/admin">Admin Dashboard</Link>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<FeedbackForm />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
