import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase.js'

export var startYear; 
export var startMonth; 
export var startDay; 
export var startWeekday;

const SignUp =()=>{
    const navigate = useNavigate(); 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSignUp = async()=>{
        try{
            await createUserWithEmailAndPassword(auth, email, password).then((userCredential)=>{
                const startDate = new Date(); 
                startYear = startDate.getFullYear(); 
                console.log(startYear)

                startMonth = startDate.getMonth(); 
                console.log(startMonth)

                startDay = startDate.getDay(); 
                console.log(startDay)

                startWeekday = startDate.getDay(); 
                console.log(startWeekday)

                const user = userCredential.user; 
                console.log(user)
                navigate('/home')
            })
        }
        catch(error){
            console.log(error)
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

                    <button type="submit"  onClick={ handleSignUp }>Sign Up</button>
                    <p>Already have an account? Sign In <a href="/signin">here.</a></p>
                </div>
            </div>
        </div>
    )

}

export default SignUp