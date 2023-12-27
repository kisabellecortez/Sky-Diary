import { GoogleButton } from 'react-google-button';
import { UserAuth } from '../context/AuthContext.js'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore';

const SignIn =()=>{
  const { googleSignIn } = UserAuth(); 
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
          </div>
          <p>Don't have an account? Sign up <a href="/signup">here.</a></p>
        </div>
      </div>
    );
};

export default SignIn; 