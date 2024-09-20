import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const notyf = new Notyf();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch('https://movieapp-api-lms1.onrender.com/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      // Check if the response includes the isAdmin field
      setUser({ email: data.email, isAdmin: data.isAdmin }); // Adjust this line as needed
      notyf.success('Login successful');
      navigate('/');
    } else {
      notyf.error('Login failed');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;
