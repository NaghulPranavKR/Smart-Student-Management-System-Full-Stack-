import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import AddStudentPage from './components/AddStudentPage';
import ViewStudentsPage from './components/ViewStudentsPage';
import './index.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="nav-brand">
            <h2>🎓 Student Portal</h2>
          </div>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/add-student">Add Student</Link></li>
            <li><Link to="/view-students">View Students</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/add-student" element={<AddStudentPage />} />
          <Route path="/view-students" element={<ViewStudentsPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
