import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Forum from './views/Forum';
import Nav from './components/Navmenu';
import Homescreen from './views/Home';
import LoginAndSignUp from './views/Loginpage';
// import Dashboard from './views/Profile';

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Homescreen />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/login" element={<LoginAndSignUp />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </Router>
  );
}

export default App;