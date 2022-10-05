import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Landing from './components/Landing';
import AddRecipe from './components/AddRecipe';
import Recipes from './components/Recipes';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/add" element={<AddRecipe />} />
      </Routes>
    </Router>
  );
}

export default App;
