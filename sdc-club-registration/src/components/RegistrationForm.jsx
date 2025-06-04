import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faIdCard, faCalendarAlt, faCode, faLink } from '@fortawesome/free-solid-svg-icons';
import './RegistrationForm.css';

function RegistrationForm() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    usn: '',
    semester: '',
    field: '',
    github: '',
    linkedin: ''
  });
  
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    } else if (formData.name.trim().length < 3) {
      errors.name = 'Name must be at least 3 characters';
    }
    
    const usnRegex = /^[0-9][A-Za-z]{2}[0-9]{2}[A-Za-z]{2}[0-9]{3}$/;
    if (!formData.usn.trim()) {
      errors.usn = 'USN is required';
    } else if (!usnRegex.test(formData.usn.toUpperCase())) {
      errors.usn = 'Please enter a valid USN (e.g., 1MV19CS001)';
    }
    
    if (!formData.semester) {
      errors.semester = 'Semester is required';
    } else if (formData.semester < 1 || formData.semester > 8) {
      errors.semester = 'Semester must be between 1 and 8';
    }
    
    if (!formData.field) {
      errors.field = 'Field of interest is required';
    }
    
    // Make GitHub and LinkedIn optional but validate format if provided
    if (formData.github && !formData.github.startsWith('https://github.com/')) {
      errors.github = 'Please enter a valid GitHub URL or leave empty';
    }
    
    if (formData.linkedin && !formData.linkedin.startsWith('https://linkedin.com/')) {
      errors.linkedin = 'Please enter a valid LinkedIn URL or leave empty';
    }
    
    return errors;
  };
  
  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  const validationErrors = validateForm();
  setErrors(validationErrors);
  
  if (Object.keys(validationErrors).length > 0) {
    setIsSubmitting(false);
    return;
  }
  
  try {
    const docRef = await addDoc(collection(db, 'registrations'), {
      name: formData.name,
      usn: formData.usn.toUpperCase(),
      semester: Number(formData.semester),
      field: formData.field,
      github: formData.github || null,
      linkedin: formData.linkedin || null,
      email: currentUser.email,
      timestamp: new Date().toISOString()
    });
    
    console.log("Document written with ID: ", docRef.id);
    setSubmitted(true);
    alert('Registration successful!');
    setTimeout(() => navigate('/about'), 2000);
  } catch (error) {
    console.error("Full error:", error);
    alert(`Registration failed: ${error.message}`);
  } finally {
    setIsSubmitting(false);
  }
};
  
  if (submitted) {
    return (
      <motion.div 
        className="submission-success"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Registration Successful!</h2>
        <p>Thank you for registering with SDC Club.</p>
        <motion.div 
          className="loading-bar"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 3 }}
        />
      </motion.div>
    );
  }
  
  return (
    <motion.div 
      className="registration-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="registration-card">
        <h1 className="registration-title">SDC Club Registration</h1>
        
        {errors.submit && <div className="error-message">{errors.submit}</div>}
        
        <form onSubmit={handleSubmit} className="registration-form">
          {/* Name Field */}
          <div className="form-group">
            <FontAwesomeIcon icon={faUser} className="input-icon" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
          
          {/* USN Field */}
          <div className="form-group">
            <FontAwesomeIcon icon={faIdCard} className="input-icon" />
            <input
              type="text"
              name="usn"
              placeholder="USN"
              value={formData.usn}
              onChange={handleChange}
              required
              pattern="[0-9][A-Za-z]{2}[0-9]{2}[A-Za-z]{2}[0-9]{3}"
              title="Please enter a valid USN (e.g., 1MV19CS001)"
            />
            {errors.usn && <span className="error">{errors.usn}</span>}
          </div>
          
          {/* Semester Field */}
          <div className="form-group">
            <FontAwesomeIcon icon={faCalendarAlt} className="input-icon" />
            <select
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              required
            >
              <option value="">Select Semester</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                <option key={sem} value={sem}>Semester {sem}</option>
              ))}
            </select>
            {errors.semester && <span className="error">{errors.semester}</span>}
          </div>
          
          {/* Field of Interest */}
          <div className="form-group">
            <FontAwesomeIcon icon={faCode} className="input-icon" />
            <select
              name="field"
              value={formData.field}
              onChange={handleChange}
              required
            >
              <option value="">Select Field of Interest</option>
              <option value="Web Development">Web Development</option>
              <option value="Mobile Development">Mobile Development</option>
              <option value="Data Science">Data Science</option>
              <option value="Machine Learning">Machine Learning</option>
              <option value="Cloud Computing">Cloud Computing</option>
              <option value="Cybersecurity">Cybersecurity</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="Blockchain">Blockchain</option>
            </select>
            {errors.field && <span className="error">{errors.field}</span>}
          </div>
          
          {/* GitHub (Optional) */}
          <div className="form-group">
            <FontAwesomeIcon icon={faLink} className="input-icon" />
            <input
              type="url"
              name="github"
              placeholder="GitHub Profile URL (Optional)"
              value={formData.github}
              onChange={handleChange}
            />
            {errors.github && <span className="error">{errors.github}</span>}
          </div>
          
          {/* LinkedIn (Optional) */}
          <div className="form-group">
            <FontAwesomeIcon icon={faLink} className="input-icon" />
            <input
              type="url"
              name="linkedin"
              placeholder="LinkedIn Profile URL (Optional)"
              value={formData.linkedin}
              onChange={handleChange}
            />
            {errors.linkedin && <span className="error">{errors.linkedin}</span>}
          </div>
          
          <motion.button
            type="submit"
            className="submit-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}

export default RegistrationForm;