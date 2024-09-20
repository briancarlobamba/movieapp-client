import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const notyf = new Notyf();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      notyf.error('Passwords do not match');
      return;
    }

    const response = await fetch('https://movieapp-api-lms1.onrender.com/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      notyf.success('Registration successful');
      navigate('/login');
    } else {
      notyf.error('Registration failed');
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm Password"
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterPage;
