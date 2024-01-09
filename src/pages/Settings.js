import Sidebar from '../nav/Sidebar.js'
import {auth} from '../firebase.js'
import { UserAuth } from '../context/AuthContext.js'
import {useState} from 'react'
import {useNavigate } from 'react-router-dom'

export default function Settings(){ 
  const {delUser, updPassword, updEmail} = UserAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  //delete current user
  const handleDelUser = async()=>{
    try{
      await delUser()
      navigate('/signin')
      
      return(
        alert("Account was deleted successfully.")
      )
    }
    catch(error){

    }
  }

  //change current users email
  const handleUpdEmail = async()=>{
    await updEmail(email)
  }

  //change current users password
  const handleUpdPass = async()=>{
    await updPassword(password)
  }
    
    return(
        <div className="settings">
            <Sidebar/>

            <h1>SETTINGS</h1>
            

            <div className="form">
              <div className="input">
                <label for="name">Email: </label>
                <input 
                type="email" 
                id="email" 
                name="email"  
                placeholder="johndoe@google.ca"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                required></input>
                <button type="submit"  onClick={handleUpdEmail}>Change Email Adress</button>
              </div>
            </div>

            <div className="form">
              <div className="input">
                <label for="name">Password: </label>
                <input 
                type="password" 
                id="password" 
                name="password"  
                placeholder="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required></input>
                <button type="submit"  onClick={handleUpdPass}>Change Password</button>              
                </div>
            </div>
            
            <button onClick={handleDelUser}>Delete Acccount</button>
            
        </div>
    )

}



