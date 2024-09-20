import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider, UserContext } from './context/UserContext';
import AppNavbar from './components/AppNavbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './components/AdminDashboard';
import AddMovieForm from './components/AddMovieForm';
import UpdateMovieForm from './components/UpdateMovieForm';

const App = () => {
  return (
    <UserProvider>
      <Router>
        <AppNavbar />
        <MainRoutes />
      </Router>
    </UserProvider>
  );
};

const MainRoutes = () => {
  const { user } = useContext(UserContext);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      {user?.isAdmin && (
        <>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/add-movie" element={<AddMovieForm />} />
          <Route path="/update-movie/:id" element={<UpdateMovieForm />} />
        </>
      )}
    </Routes>
  );
};

export default App;
