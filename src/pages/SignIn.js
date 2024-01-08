import { GoogleButton } from 'react-google-button';
import React, { useState } from 'react';  
import { UserAuth } from '../context/AuthContext.js'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const auth = getAuth(); 

const SignIn =()=>{
  const { googleSignIn } = UserAuth(); 
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleGoogleSignIn = async()=>{
    try{
      await googleSignIn(); 
      navigate('/home')
    }

    catch(error){
      console.log(error);
    }
  }

  const handleSignIn = async()=>{
    try{
        await signInWithEmailAndPassword(auth, email, password).then((userCredential)=>{
            const user = userCredential.user; 
            console.log(user)
            navigate('/home')
        })
    }
    catch(userCredential){
        console.log("Invalid email or password.")

        return(
          alert("Email or password is incorrect.")
        )
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
        <h1>Welcome back to SkyDiary</h1>
        <p>Continue your narrative.</p>
        <div className="signIn-card">
          <h1>Sign In</h1>
          <div className="signIn-button">
            <GoogleButton onClick={ handleGoogleSignIn }/>

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
              <button type="submit"  onClick={ handleSignIn }>Sign Up</button>
            </div>

          </div> 
          <p>Don't have an account? Sign up <a href="/signup">here.</a></p>
        </div>
      </div>
    );
};

export default SignIn; 