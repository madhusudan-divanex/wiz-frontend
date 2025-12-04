import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { fetchUserProfile } from './redux/features/userSlice';
import { useDispatch } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (userId && token) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, userId, token]); // ✅ only runs once unless these change

  if (!userId || !token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
