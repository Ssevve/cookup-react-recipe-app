import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

import Header from './components/Header';
import Landing from './components/Landing';
import AddRecipe from './components/AddRecipe';
import Recipes from './components/Recipes';
import Recipe from './components/Recipe';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const [user, setUser] = useState(null);

  async function getUser() {
    try {
      const res = await fetch('http://localhost:8000/api/auth', {
        credentials: 'include',
      });
      const data = await res.json();

      if (data.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Router>
      <div className="flex-column h-full">
        <Header user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route
            path="/recipe"
            element={<Recipe />}
          />
          <Route path="/add" element={<AddRecipe />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
