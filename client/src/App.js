import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PostDetailsPage from './pages/PostDetailsPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage'; 
import ProfilePage from './pages/ProfilePage';




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/post/:id" element={<PostDetailsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signUp" element={<SignUpPage />} /> 
        <Route path="/profile" element={<ProfilePage />} /> {/* Rota do perfil */}
      </Routes>
    </Router>
  );
}

export default App;
