import React, { useEffect, useState } from 'react';
import './index.css';
import Notes from './Notes';

function Home(props) {
  const [userData, setUserData] = useState(null);

  const getuserdata = async () => {
    try {
      const response = await fetch('http://localhost:2000/api/auth/getuser', {
        method: 'POST',
        headers: {
          'auth-token': localStorage.getItem('token'),
        },
      });
      const json = await response.json();
      setUserData(json);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    getuserdata(); // Fetch user data when the component mounts
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    
    <div className="container mx-auto mt-5">
      {userData?(
        <h1 className="text-3xl text-center">Welcome,{userData.name}</h1>
      ):(
        <h1 className="text-3xl text-center">Loading Data</h1>
      )

      }
      <Notes showalert={props.showalert} />
    </div>
  );
}

export default Home;
