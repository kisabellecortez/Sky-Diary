import Sidebar from '../nav/Sidebar.js'
import { auth } from '../firebase.js'
import { UserAuth } from '../context/AuthContext.js'
import {useState} from 'react'
import {useNavigate } from 'react-router-dom'

export default function Settings(){ 
  const {deleteUser} = UserAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

    const handleDelUser = async()=>{
      try{
        await deleteUser(auth)
        navigate('/signin')
      }
      catch(error){

      }
    }

    const handleUpdEmail = async()=>{

    }

    const handleUpdPass = async()=>{

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
            
            <button type="submit"  onClick={handleDelUser}>Delete Acccount</button>
            
        </div>
    )

}



