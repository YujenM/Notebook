import React from 'react'
import './index.css'
import Notes from './Notes'


function Home() {
  
  return (
    <div className='container mx-auto mt-5'>
        <h1 className='text-3xl textcenter'>Write It Down, Keep It Handy.</h1>
        <Notes/>
    </div>
  )
}

export default Home;
