import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './index.css';

import Layout from './components/Layout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/auth', {
        credentials: 'include',
      });
      const data = await res.json();
      return setUser(data.user);
    } catch (err) {
      return console.log(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Router>
      <Layout user={user} setUser={setUser}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* Private Routes */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
