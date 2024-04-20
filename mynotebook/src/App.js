import './App.css';
import Navbar from './components/Navbar'; 
import Home from './components/Home';
import About from './components/About';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Notestate from './context/notes/NoteState';

function App() {
  return (
    <>
      <Notestate>
        <Router>
          <Navbar/>
          <Routes>
            <Route exact path="/" element={<Home />} /> 
            <Route exact path="/About" element={<About />} /> 
          </Routes>
        </Router> 
      </Notestate>
    </>
  );
}

export default App;
