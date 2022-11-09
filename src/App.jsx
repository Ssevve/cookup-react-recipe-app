import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './index.css';

import Navbar from './components/Navbar';
import Landing from './pages/Landing';

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
      <Navbar user={user} setUser={setUser} />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        {/* Private Routes */}
      </Routes>
    </Router>
  );
}

export default App;
