import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { auth, googleProvider, signInWithPopup, signInWithEmailAndPassword } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  

const handleEmailLogin = async (e) => {
  e.preventDefault();
  setError('');
  try {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }
    await signInWithEmailAndPassword(auth, email, password);
    // No need for alert, just navigate
    navigate('/about');
  } catch (err) {
    console.error("Login error:", err.code, err.message);
    setError(
      err.code === 'auth/invalid-credential'
        ? "Invalid email or password. Please check your credentials or sign up."
        : err.message
    );
  }
};

 const handleGoogleLogin = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
    navigate('/about');
  } catch (err) {
    console.error("Google login error:", err.code, err.message);
    setError(err.message);
  }
};

  return (
    <motion.div className="login-container">
      <div className="login-card">
        <h1 className="login-title">SDC Club</h1>
        <p className="login-subtitle">MVJ College of Engineering</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleEmailLogin} className="login-form">
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
            Login with Email
          </motion.button>
        </form>

        <div className="signup-link">
          <p>Don't have an account? <a href="/signup">Sign Up</a></p>
        </div>

        <div className="divider">
          <span>OR</span>
        </div>

        <motion.button
          className="google-login-button"
          onClick={handleGoogleLogin}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FontAwesomeIcon icon={faGoogle} className="button-icon" />
          Continue with Google
        </motion.button>
      </div>
    </motion.div>
  );
}

export default Login;