import Sidebar from '../nav/Sidebar.js'
import React, { useState } from 'react'
import { doc, addDoc, collection, updateDoc, deleteDoc, getDoc } from 'firebase/firestore'

export default function SignIn(){
    const[log, setLog] = useState('')

    return(
  
        <div className="home">
            <Sidebar/>

            <div className="calendar">

            </div>

            <div className="logBox">
                <h1>HOW ARE YOU FEELING TODAY?</h1>
                <textarea
                    id="log" 
                    name="log" 
                    placeholder="Any food for thoughts..."
                    value={log}
                    onChange={(e)=>setLog(e.target.value)}
                    required
                >
                </textarea>
                <button type="submit">POST</button>
            </div>
            
        </div>
    );
}