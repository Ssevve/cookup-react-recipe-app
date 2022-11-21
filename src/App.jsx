import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './index.css';

import Layout from './components/Layout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PrivateRoutes from './utils/PrivateRoutes';
import AddRecipe from './pages/AddRecipe';
import BrowseRecipes from './pages/BrowseRecipes';
import Profile from './pages/Profile';

function App() {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await fetch('http://localhost:8000/auth', {
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
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/recipes/browse" element={<BrowseRecipes user={user} />} />
          <Route path="/profile/:userId" element={<Profile user={user} />} />
          {/* Private Routes */}
          <Route element={<PrivateRoutes />}>
            <Route path="/recipes/add" element={<AddRecipe />} />
          </Route>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
