import { useContext, createContext, useState, useEffect } from 'react'; 
import { updatePassword, GoogleAuthProvider , updateEmail, createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword, signOut, onAuthStateChanged, deleteUser, sendEmailVerification } from 'firebase/auth';
import { auth } from '../firebase.js' 

const AuthContext = createContext()

export const AuthContextProvider = ({ children })=> {
    const [user, setUser] = useState({});

    const googleSignIn =()=> {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    };

    function signUp(email, password){
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) =>  {
        return signInWithEmailAndPassword(auth, email, password)
       }

    const logOut =()=>{
        return signOut(auth)
    }

    const delUser =()=>{
        return deleteUser(user)
    }

    const createUser = (email, password) =>{
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const updEmail =(email)=>{
        sendEmailVerification(user)

        if(user.emailVerified){
            updateEmail(user, email)
        }
    }

    const updPassword =(password)=>{
        return updatePassword(user, password)
    }
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          console.log(currentUser);
          setUser(currentUser);
        });
        return () => {
          unsubscribe();
        };
      }, []);

    return(
        <AuthContext.Provider value = {{ updPassword, googleSignIn, signIn, logOut, deleteUser, signUp, delUser, createUser, user, updEmail }}>
            { children }
        </AuthContext.Provider>
    );
};

export const UserAuth =()=> {
    return useContext(AuthContext)
};

