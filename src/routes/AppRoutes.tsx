import React, { JSX } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../components/Authentication/Login';
import MemberDashboard from '../components/Dashboard/MemberDashboard';
// Import additional pages as needed

// A simple protected route component – replace with your own auth logic.
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = true; // Replace with actual auth logic (e.g., from useAuth hook)
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MemberDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
