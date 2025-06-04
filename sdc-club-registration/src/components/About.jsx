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
      {/* Floating decorative elements */}
      <div className="decor"></div>
      <div className="decor"></div>
      <div className="decor"></div>
      
      <motion.div 
        className="about-card"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h1 className="about-title">Welcome to SDC Club</h1>
        
        <div className="about-content">
          <motion.section 
            className="about-section"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2>About SDC</h2>
            <p>
              The Software Development Club (SDC) of MVJ College of Engineering is a technical club 
              dedicated to fostering software development skills among students.
            </p>
          </motion.section>
          
          <motion.section 
            className="about-section"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h2>Our Mission</h2>
            <p>
              To create a community of passionate developers who collaborate, learn, and build 
              innovative solutions to real-world problems.
            </p>
          </motion.section>

          <motion.section 
            className="about-section"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <h2>Registration Guidelines</h2>
            <ol className="guidelines-list">
              <li>You must be a current student of MVJCE</li>
              <li>Provide accurate information in the registration form</li>
              <li>Include your GitHub and LinkedIn profiles if available</li>
              <li>Registration is free and open to all departments</li>
            </ol>
          </motion.section>
        </div>

        <motion.button
          className="register-button"
          onClick={() => navigate('/register')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          Register Here
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default About;