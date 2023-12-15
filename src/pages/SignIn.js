import { GoogleButton } from 'react-google-button';
import { UserAuth } from '../context/AuthContext.js'

const SignIn =()=>{
  const { googleSignIn } = UserAuth(); 

  const handleGoogleSignIn = async()=>{
    try{
      await googleSignIn(); 
    }

    catch (error){
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
        <h1>Welcome to SkyDiary</h1>
        <p>Begin your narrative today, and watch as each entry becomes a vibrant stroke in the masterpiece of your life.</p>
        <div className="signIn-card">
        <h1>Sign In</h1>
        <div className="signIn-button">
          <GoogleButton onClick={ handleGoogleSignIn }/>
        </div>
        </div>
      </div>
    );
};

export default SignIn; 