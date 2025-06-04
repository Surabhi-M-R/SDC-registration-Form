import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './About.css';

function About() {
  const navigate = useNavigate();

  return (
    <motion.div 
      className="about-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="about-card">
        <h1 className="about-title">Welcome to SDC Club</h1>
        
        <div className="about-content">
          <section className="about-section">
            <h2>About SDC</h2>
            <p>
              The Software Development Club (SDC) of MVJ College of Engineering is a technical club 
              dedicated to fostering software development skills among students.
            </p>
          </section>
          
          <section className="about-section">
            <h2>Our Mission</h2>
            <p>
              To create a community of passionate developers who collaborate, learn, and build 
              innovative solutions to real-world problems.
            </p>
          </section>

          <section className="about-section">
            <h2>Registration Guidelines</h2>
            <ol className="guidelines-list">
              <li>You must be a current student of MVJCE</li>
              <li>Provide accurate information in the registration form</li>
              <li>Include your GitHub and LinkedIn profiles if available</li>
              <li>Registration is free and open to all departments</li>
            </ol>
          </section>
        </div>

        <motion.button
          className="register-button"
          onClick={() => navigate('/register')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Register Here
        </motion.button>
      </div>
    </motion.div>
  );
}

export default About;