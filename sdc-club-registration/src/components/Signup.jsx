import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Reuse Login.css for consistent styling (adjust if needed)

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
  e.preventDefault();
  setError('');
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    alert("Account created successfully! You are now logged in.");
    navigate('/about');
  }catch (err) {
      console.error("Signup error:", err.code, err.message);
      setError(err.message);
    }
  };

  return (
    <motion.div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Sign Up - SDC Club</h1>
        <p className="login-subtitle">MVJ College of Engineering</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSignup} className="login-form">
          <div className="input-group">
            <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ color: 'white' }}
            />
          </div>
          <div className="input-group">
            <FontAwesomeIcon icon={faLock} className="input-icon" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ color: 'white' }}
            />
          </div>
          <motion.button
            type="submit"
            className="login-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!email || !password}
          >
            Sign Up
          </motion.button>
        </form>
        <div className="signup-link">
          <p>Already have an account? <a href="/">Login</a></p>
        </div>
      </div>
    </motion.div>
  );
}

export default Signup;