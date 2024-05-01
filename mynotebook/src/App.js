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
import Signup from './components/Signup';
import Userlogin from './components/Userlogin';
// import Alert from './components/Alert';


function App() {
  return (
    <>
      <Notestate>
        <Router>
          <Navbar/>
          {/* <Alert message="This is an informational message." type="info" />
            <Alert message="This is a success message!" type="success" />
            <Alert message="Warning! Proceed with caution." type="warning" />
            <Alert message="Error: Something went wrong." type="error" /> */}
          <Routes>
            <Route exact path="/" element={<Home />} /> 
            <Route exact path="/About" element={<About />} /> 
            <Route exact path="/UserLogin" element={<Userlogin />} /> 
            <Route exact path="/signup" element={<Signup />} /> 
          </Routes>
        </Router> 
      </Notestate>
    </>
  );
}

export default App;
