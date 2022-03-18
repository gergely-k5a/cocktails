import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cocktail from './components/Cocktail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/cocktail" element={<Cocktail />} />
      </Routes>
    </Router>
  );
}

export default App;
