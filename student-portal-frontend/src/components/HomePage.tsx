import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login');
  };

  const handleLearnMore = () => {
    alert('Student Management System: Our platform provides comprehensive tools for managing student data, including attendance tracking, performance analysis, and secure data storage. Features include real-time dashboards, bulk operations, and detailed reporting.');
  };

  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Student Portal</h1>
          <p className="hero-subtitle">
            Empowering Education Through Intelligent Management
          </p>
          <p className="hero-description">
            Seamlessly manage student data, track attendance, analyze performance, and gain insights with our comprehensive dashboard. Built for educators, designed for excellence.
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">1000+</span>
              <span className="stat-label">Students Managed</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">95%</span>
              <span className="stat-label">Pass Rate</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Access</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-images">
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" alt="Students studying" className="hero-image" />
            <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" alt="Student data management" className="hero-image" />
            <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" alt="Digital analytics dashboard" className="hero-image" />
            <img src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" alt="Classroom learning" className="hero-image" />
          </div>
        </div>
      </div>

      <div className="features-section">
        <h2>Powerful Features at Your Fingertips</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Advanced Dashboard</h3>
            <p>Comprehensive analytics with interactive charts and real-time insights into student performance and attendance trends.</p>
            <ul className="feature-list">
              <li>Real-time data visualization</li>
              <li>Performance metrics</li>
              <li>Trend analysis</li>
            </ul>
          </div>
          <div className="feature-card">
            <h3>Student Management</h3>
            <p>Efficiently manage student records with powerful CRUD operations, search functionality, and bulk actions.</p>
            <ul className="feature-list">
              <li>Add/Edit student profiles</li>
              <li>Advanced search & filtering</li>
              <li>Bulk operations</li>
            </ul>
          </div>
          <div className="feature-card">
            <h3>Performance Tracking</h3>
            <p>Monitor academic progress with detailed attendance tracking, marks analysis, and predictive insights.</p>
            <ul className="feature-list">
              <li>Attendance monitoring</li>
              <li>Grade analysis</li>
              <li>Progress reports</li>
            </ul>
          </div>
          <div className="feature-card">
            <h3>Secure Access</h3>
            <p>Role-based access control ensuring data security and privacy for all user interactions.</p>
            <ul className="feature-list">
              <li>User authentication</li>
              <li>Data encryption</li>
              <li>Access management</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="testimonials-section">
        <h2>What Educators Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p>"This platform has revolutionized how we manage student data. The analytics are incredible."</p>
            <cite>- Dr. Sarah Johnson, Principal</cite>
          </div>
          <div className="testimonial-card">
            <p>"Easy to use, powerful features, and excellent support. Highly recommended for any school."</p>
            <cite>- Prof. Michael Chen, Department Head</cite>
          </div>
          <div className="testimonial-card">
            <p>"The attendance tracking and performance insights have helped us improve student outcomes significantly."</p>
            <cite>- Ms. Emily Davis, Teacher</cite>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <h2>Ready to Transform Your Student Management?</h2>
        <p>Join thousands of educators who trust our platform for comprehensive student data management.</p>
        <div className="cta-buttons">
          <button className="cta-primary" onClick={handleGetStarted}>Get Started</button>
          <button className="cta-secondary" onClick={handleLearnMore}>Learn More</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
