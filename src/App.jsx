import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';


import Header from './components/Header';
import Landing from './components/Landing';
import AddRecipe from './components/AddRecipe';
import Recipes from './components/Recipes';
import Recipe from './components/Recipe';

function App() {
  return (
    <Router>
      <div className="flex-column h-full">
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipe" element={<Recipe />} render={(props) => <Recipe {...props} />} />
          <Route path="/add" element={<AddRecipe />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
