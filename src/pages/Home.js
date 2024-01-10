import Sidebar from '../nav/Sidebar.js'
import { db } from '../firebase.js'
import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import { UserAuth } from '../context/AuthContext.js'
import {getDocs, collection } from 'firebase/firestore'
import '../index.css'

export default function SignIn(){
  const[log, setLog] = useState('')
  const navigate = useNavigate()
  const [currentDate, setCurrentDate] = useState(new Date());
  const { addEntry } = UserAuth(); 

  const [data, setData] = useState();
  
    const {user} = UserAuth()

   
    
  //add document to users database
  const handleEntry = async()=>{
    try{
      await addEntry(log)
      console.log("Entry successfully added.")
    }
    catch(error){
      console.log(error)
    }
  }

  const [loading, setLoading] = useState(true);

 
  const id = user?.uid; // Check if user is defined before accessing uid

  const getData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, id));
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setData(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  useEffect(()=>{
    getData()
  }, [])

  useEffect(() => {
    createCalendar(currentDate.getFullYear(), currentDate.getMonth() + 1);
  }, [currentDate]);

  const createCalendar = (year, month) => {
    const table = document.getElementById("calendar");
    const today = new Date().getDate();

    // Clear existing content of the table
    table.innerHTML = "";

    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
    const weeksInMonth = Math.ceil((daysInMonth + firstDayOfMonth) / 7);

    // Add weekdays row
    const weekdaysRow = table.insertRow(0);
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    weekdays.forEach((weekday) => {
      const th = document.createElement("th");
      th.textContent = weekday;
      weekdaysRow.appendChild(th);
    });

    let dayCounter = 1;

    for (let i = 1; i <= weeksInMonth; i++) {
      const row = table.insertRow(i);

      for (let j = 0; j < 7; j++) {
        const cell = row.insertCell(j);

        if ((i === 1 && j < firstDayOfMonth) || dayCounter > daysInMonth) {
          cell.innerHTML = "";
        } else {
          cell.innerHTML = dayCounter;

          if (
            year === currentDate.getFullYear() &&
            month === currentDate.getMonth() + 1 &&
            dayCounter === today
          ) {
            cell.classList.add("today");
          }

          dayCounter++;
        }
      }
    }
  };

  const updateMonthYear = () => {
    const monthYearElement = document.getElementById("monthYear");
    const options = { month: "long", year: "numeric" };
    monthYearElement.textContent = currentDate.toLocaleDateString("en-US", options);
  };

  useEffect(() => {
    updateMonthYear();
  }, [currentDate]);
  
    return(
  
        <div className="home">
            <Sidebar/>
            <div className="calendar-div">
                <h2 id="monthYear"></h2>
                <table id="calendar"></table>
            </div>

            <div className="logBox">
                <h1>HOW ARE YOU FEELING TODAY?</h1>
                <textarea
                    id="log" 
                    name="log" 
                    placeholder="Any food for thoughts?..."
                    value={log}
                    onChange={(e)=>setLog(e.target.value)}
                    required
                >
                </textarea>
                <button type="submit" onClick={handleEntry}>POST</button>
            </div>
            <div className="card-container">
        {loading ? (
          <div className="card">
            <p>Loading...</p>
          </div>
        ) : data && data.length > 0 ? (
          data.map((entry, i) => (
            <div className="card" key={entry.id}>
              <p>{entry.id}</p>
              <p>{entry.string}</p>
            </div>
          ))
        ) : (
          <div className="card">
            <p>No data</p>
          </div>
        )}
      </div>
            
        </div>
    );
}