import React from 'react';
import ReactDOM from 'react-dom/client';  // Import createRoot from 'react-dom/client'
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));  // Create root with createRoot
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
