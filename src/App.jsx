import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './index.css';

import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PrivateRoutes from './utils/PrivateRoutes';
import AddRecipePage from './pages/AddRecipePage';
import BrowseRecipesPage from './pages/BrowseRecipesPage';
import ProfilePage from './pages/ProfilePage';
import RecipePage from './pages/RecipePage';
import EditRecipe from './pages/EditRecipePage';

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
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/recipes/browse" element={<BrowseRecipesPage user={user} />} />
          <Route path="/profile/:userId" element={<ProfilePage user={user} />} />
          <Route path="/recipes/:recipeId" element={<RecipePage />} />
          {/* Private Routes */}
          <Route element={<PrivateRoutes />}>
            <Route path="/recipes/add" element={<AddRecipePage />} />
            <Route path="/recipes/edit/:recipeId" element={<EditRecipe />} />
          </Route>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
