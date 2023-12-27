import { UserAuth } from '../context/AuthContext.js'

export default function SidebarItem({item}){
    const { user, logOut } = UserAuth(); 

    //signs out user
    const handleSignOut = async()=>{
        try{
            await logOut()
            console.log(user)
        }
        catch(error){
            console.log(error)
        }
    }

    return(
        //display nav pages
        <a href = {item.path || '#'} className = "sidebar-item">
            <div className = "sidebar-title" onClick={handleSignOut}>
                <span>
                    {item.title}
                </span>
            </div>
        </a>
    )

}