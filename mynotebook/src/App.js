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
    }, 1000); 
  };

  return (
    <Notestate>
        <Router>
          <Navbar />
          {alert && <Alert message={alert.msg} type={alert.type} />}
          {/* <Alert message="This is an informational message." type="info" />
            <Alert message="This is a success message!" type="success" />
            <Alert message="Warning! Proceed with caution." type="warning" />
            <Alert message="Error: Something went wrong." type="error" /> */} 
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
