import React, { useState }  from 'react'
import './Css/Setting.css'

function Setting() {
  const[password,setpassword]=useState({oldpassword:'',newpassword:'',confirmnewpassword:''});

  const handleChange = (e) => {
    setpassword({ ...password, [e.target.name]: e.target.value });
  };
  const handlesubmit= async (e)=>{
    e.preventDefault()
    if(password.newpassword!==password.confirmnewpassword){
      alert("password mismatch");
      return;
    }
    try{
      const response= await fetch("http://localhost:2000/api/auth/updatepassword",{
        method:"POST",
        headers:{
          'Content-Type': 'application/json', 
          'auth-token':localStorage.getItem('token')
        },
        body: JSON.stringify({
          oldPassword: password.oldpassword,
          newPassword: password.newpassword
        })
      })
      const json=await response.json()
      console.log(json)
      if (!response.ok) {
        throw new Error(json.errors?.[0]?.msg || 'Something went wrong');
      }
      alert('Password Succesfully changed')
    }catch(err){
      alert(err.message);
    }
  }
  return (
    <div>
      <div className="flex justify-center mt-5">
        <h1>Welcome User</h1>
      </div>
      <div className="container mx-auto">
        <h1 >Change Password</h1>
        <form onSubmit={handlesubmit}>
          <label>Old Password</label>
          <input type="password" name="oldpassword" value={password.oldpassword} onChange={handleChange} />
          <label>New Password</label>
          <input type="password" name="newpassword" value={password.newpassword} onChange={handleChange} />
          <label>Confirm New Password</label>
          <input type="password" name="confirmnewpassword" value={password.confirmnewpassword} onChange={handleChange}/>
          <button type='submit' className="buttonsubmit text-white font-bold py-2 rounded-lg mt-5">
              changepassword
          </button>
        </form>
      </div>
    </div>
  )
}

export default Setting;
