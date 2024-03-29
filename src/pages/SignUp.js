import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext.js'

const SignUp =()=>{
    const navigate = useNavigate(); 

    const { createUser } = UserAuth()

    //user information
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordC, setPasswordC] = useState('')

    //create new users
    const handleSignUp = async()=>{
        try{
            if(password === passwordC){
                await createUser(email, password)
                navigate('/home')
            
            }
            else{
                return(
                    alert("Passwords do not match.")
                )
            }
       
        }
        catch(error){
            alert(error)
        }
    }

    return(
        <div className="signIn">

            <div className="cloud cloud1"></div>
            <div className="cloud cloud2"></div>
            <div className="cloud cloud3"></div>
            <div className="cloud cloud4"></div>
            <div className="cloud cloud5"></div>
            <div className="cloud cloud6"></div>
            <div className="cloud cloud7"></div>

            <h1>Welcome to SkyDiary</h1>

            <p>Begin your narrative today, and watch as each entry becomes a vibrant stroke in the masterpiece of your life.</p>

            <div className="signIn-card">
                <h1>Sign Up</h1>
                
                <div className="form">
                    <div classname="input">
                        <label for="name">Email: </label>
                        <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        placeholder="johndoe@google.ca"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        required></input>
                    </div>
                    
                    <div className="input">
                        <label for="name">Password: </label>
                        <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        placeholder="abcd1234"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        required></input>
                    </div>

                    <div className="input">
                        <label for="name">ConfirmPassword: </label>
                        <input 
                        type="password" 
                        id="passwordC" 
                        name="passwordC" 
                        placeholder="abcd1234"
                        value={passwordC}
                        onChange={(e)=>setPasswordC(e.target.value)}
                        required></input>
                    </div>
                </div>

                <button type="submit"  onClick={ handleSignUp }>Sign Up</button>
                <p>Already have an account? Sign In <a href="/signin">here.</a></p>
            </div>
        </div>
    )
}

export default SignUp