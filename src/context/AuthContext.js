import { useContext, createContext, useState, useEffect } from 'react'; 
import { updatePassword, GoogleAuthProvider , updateEmail, createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword, signOut, onAuthStateChanged, deleteUser, sendEmailVerification } from 'firebase/auth';
import { auth, db } from '../firebase.js' 
import { doc, setDoc, getDoc } from 'firebase/firestore'

const AuthContext = createContext()

export const AuthContextProvider = ({ children })=> {
    const [user, setUser] = useState({});

    const googleSignIn =()=> {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
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
        createUserWithEmailAndPassword(auth, email, password)
    }

    function addEntry(entry){
        //get date to use as id 
        const date = new Date();  
        const day = date.getDay(); 
        const month = date.getMonth(); 
        const year = date.getFullYear(); 
        const id = (day.toString() + month.toString() + year.toString())

        //add data to users database
        setDoc(doc(db, user.uid, id), {
            string: entry
        })
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
        <AuthContext.Provider value = {{ addEntry, updPassword, googleSignIn, signIn, logOut, deleteUser, signUp, delUser, createUser, user, updEmail }}>
            { children }
        </AuthContext.Provider>
    );
};

export const UserAuth =()=> {
    return useContext(AuthContext)
};

