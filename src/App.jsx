import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './index.css';

import Header from './components/Navbar';
import Landing from './pages/Landing';
import AddRecipe from './pages/AddRecipe';
import EditRecipe from './pages/EditRecipe';
import Recipes from './pages/Recipes';
import Recipe from './pages/Recipe';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import PrivateRoutes from './utils/PrivateRoutes';

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
      <Header user={user} setUser={setUser} />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipe/:recipeId" element={<Recipe />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup />} />
        {/* Private Routes */}
        <Route element={<PrivateRoutes />}>
          <Route path="/add" element={<AddRecipe />} />
          <Route path="/edit/:recipeId" element={<EditRecipe />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
