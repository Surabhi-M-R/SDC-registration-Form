import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function PrivateRoute() {
  const { currentUser, loading } = useAuth();
  
  useEffect(() => {
    console.log('PrivateRoute - Current User:', currentUser);
    console.log('PrivateRoute - Loading State:', loading);
  }, [currentUser, loading]);

  if (loading) {
    console.log('PrivateRoute - Showing loading state');
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>Loading authentication...</p>
      </div>
    );
  }

  console.log(`PrivateRoute - Decision: ${currentUser ? 'Grant access' : 'Redirect to login'}`);
  
 
  return currentUser ? <Outlet /> : <Navigate to="/" replace />;
}