import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Notestate from './context/notes/NoteState';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Signup from './components/Signup';
import Userlogin from './components/Userlogin';
import Alert from './components/Alert';

function App() {
  const [alert, setAlert] = useState(null);

  const showalert = (message, type) => {
    setAlert({
      msg: message,
      type,
    });

    setTimeout(() => {
      setAlert(null);
    }, 2000); 
  };

  return (
    <Notestate>
        <Router>
          <Navbar />
          {alert && <Alert message={alert.msg} type={alert.type} />}
          <Routes>
            <Route exact path="/" element={<Home showalert={showalert} />} />
            <Route exact path="/About" element={<About />} />
            <Route exact path="/UserLogin" element={<Userlogin showalert={showalert} />} />
            <Route exact path="/signup" element={<Signup showalert={showalert} />} />
          </Routes>
        </Router>
    </Notestate>
  );
}

export default App;
