import { Link } from 'react-router-dom'
import {useState} from "react"
import { UserAuth } from '../context/AuthContext.js'

export default function SidebarItem({item}){
    const { user, logOut } = UserAuth(); 

    const handleSignOut = async()=>{
        try{
            await logOut()
        }
        catch(error){
            console.log(error)
        }
    }

    if(item.title === "LOGOUT"){
        return(
            <a href = {item.path || '#'} className = "sidebar-item">
                {user?.displayName ? (
                    <div  className="sidebar-title" onClick={handleSignOut}>
                        <span>
                            {item.title}
                        </span>
                    </div> 
                ):( 
                    <Link to='/signin'></Link>
                )}
            </a>
        )
    }
    else{
        return(
            <a href = {item.path || '#'} className = "sidebar-item">
                <div className = "sidebar-title">
                    <span>
                        {item.title}
                    </span>
                </div>
            </a>
        )
    }

}