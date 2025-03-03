import React, { Suspense, lazy, JSX } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const Login = lazy(() => import('../components/authentication/Login'));
const PasswordRecovery = lazy(() => import('../components/authentication/PasswordRecovery'));
const MemberDashboard = lazy(() => import('../components/dashboard/MemberDashboard'));
const AdminDashboard = lazy(() => import('../components/dashboard/AdminDashboard'));
const ProfileScreen = lazy(()=> import('../components/profile/ProfileScreen'))

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem('authToken');
  return token ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/password-recovery" element={<PasswordRecovery />} />
          <Route
            path="/dashboard/member"
            element={
              <ProtectedRoute>
                <MemberDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
            <Route path="/profile" element={<ProfileScreen />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRoutes;
