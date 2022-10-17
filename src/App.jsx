import { useState, useEffect } from 'react';
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

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    try {
      const res = await fetch('http://localhost:8000/api/auth', {
        credentials: 'include',
      });
      const data = await res.json();

      console.log('Get user response: ');
      console.log(data);

      if (data.user) {
        console.log('Get User: There is a user saved in the server session: ');
        setUser(data.user);
      } else {
        console.log('Get user: no user');
        setUser(null);
      }
    } catch (err) {
      console.log(err);
    }
  }

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
            render={(props) => <Recipe {...props} />}
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
