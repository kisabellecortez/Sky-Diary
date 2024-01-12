import Sidebar from '../nav/Sidebar.js'
import { UserAuth } from '../context/AuthContext.js'
import {useNavigate } from 'react-router-dom'

export default function Settings(){ 
  const {delUser} = UserAuth()
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
    
    return(
        <div className="settings">
            <Sidebar/>

            <h1>SETTINGS</h1>
            
            <button onClick={handleDelUser}>Delete Acccount</button>
            
        </div>
    )

}



