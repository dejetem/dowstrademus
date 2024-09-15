import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

const App: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          {/* Public routes */}
          <Route
            path="/login"
            element={<PublicRoute element={<Login />} isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/register"
            element={<PublicRoute element={<Register />} isAuthenticated={isAuthenticated} />}
          />

          {/* Private route */}
          <Route
            path="/"
            element={<PrivateRoute element={<Dashboard />} isAuthenticated={isAuthenticated} />}
          />

          {/* Redirect any other routes to login page */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
