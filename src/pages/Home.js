import Sidebar from '../nav/Sidebar.js'
import { db } from '../firebase.js'
import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import { UserAuth } from '../context/AuthContext.js'
import {getDocs, collection } from 'firebase/firestore'
import '../index.css'

export default function SignIn(){
  const [log, setLog] = useState('');
  const [isEditMode, setEditMode] = useState(false); // State to track edit mode
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const { addEntry } = UserAuth();
  const [data, setData] = useState();
  const { user } = UserAuth();
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const currId = day.toString() + month.toString() + year.toString();
  const [editableContent, setEditableContent] = useState('');


  const handleEntry = async () => {
    try {
      if (isEditMode) {
        await addEntry(editableContent)
        console.log('Entry successfully updated.');
      } else {
        // Handle logic for posting new entry
        await addEntry(log);
        console.log('Entry successfully added.');
      }
      setEditMode(false); // Exit edit mode after posting or updating
    } catch (error) {
      console.log(error);
    }
  };

  const editData = () => {
    setEditMode(true); // Enter edit mode when "EDIT" is clicked
    setEditableContent(data.find((entry) => entry.id === currId)?.string || '');
  };

  const getData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, user?.uid));
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [user?.uid, isEditMode]);

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
          {isEditMode ? (
            // Render "UPDATE" button during edit mode
            <div className="display">
              <textarea
                id="log"
                name="log"
                value={editableContent}
                onChange={(e) => setEditableContent(e.target.value)}
                required
              ></textarea>
              <button type="submit" onClick={handleEntry}>
                UPDATE
              </button>
            </div>
          ) : data && data.some((entry) => entry.id === currId) ? (
            // If a document with the same ID exists, show a different button
            <div className="display">
              <p>{data.find((entry) => entry.id === currId)?.string}</p>
              <button type="button" onClick={editData}>
                EDIT
              </button>
            </div>
          ) : (
        // If no document with the same ID exists, show the original button
            <div className="display">
              <textarea
                id="log"
                name="log"
                placeholder="Any food for thoughts?..."
                value={log}
                onChange={(e) => setLog(e.target.value)}
                required
              ></textarea>
              <button type="submit" onClick={handleEntry}>
                POST
              </button>
            </div>
          )}
        </div>
      </div>
    );
}