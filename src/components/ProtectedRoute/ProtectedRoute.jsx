import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      toast.error('Please login to access this page');
    }
  }, [token]);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default ProtectedRoute;
