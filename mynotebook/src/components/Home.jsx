import React from 'react'
import './index.css'
import Notes from './Notes'


function Home(props) {
  const showAlert=props.showalert;
  return (
    <div className='container mx-auto mt-5'>
        <h1 className='text-3xl textcenter'>Your Notes</h1>
        <Notes showAlert={showAlert}/>
    </div>
  )
}

export default Home;
