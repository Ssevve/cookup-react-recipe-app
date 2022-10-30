import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './index.css';

import Header from './components/Header';
import Landing from './components/Landing';
import AddRecipe from './components/AddRecipe';
import EditRecipe from './components/EditRecipe';
import Recipes from './components/Recipes';
import Recipe from './components/Recipe';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
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
      <div className="flex-column h-full">
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
      </div>
    </Router>
  );
}

export default App;
