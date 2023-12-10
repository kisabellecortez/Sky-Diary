import { GoogleButton } from 'react-google-button';
import { AuthContextProvider } from '../context/AuthContext.js'

export default function SignIn(){
    return(
      <div className="signIn">
        <h1>Welcome to DiaryVerse</h1>
        <p>Where every thought will be remembered through the pages of your diary. Begin your narrative today, and watch as each entry becomes a vibrant stroke in the masterpiece of your life.</p>
        <h1>Sign In</h1>
        <div className="signIn-button">
          <GoogleButton/>
        </div>
      </div>
    );
}
