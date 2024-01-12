import Sidebar from '../nav/Sidebar.js'
import { db } from '../firebase.js'
import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import { UserAuth } from '../context/AuthContext.js'
import {doc, getDoc, getDocs, collection } from 'firebase/firestore'
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

const today = dayjs();

export default function SignIn(){
  const [log, setLog] = useState('');
  const [isEditMode, setEditMode] = useState(false); // State to track edit mode
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const { addEntry } = UserAuth();
  const [data, setData] = useState([]);
  const { user } = UserAuth();
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const currId = day.toString() + month.toString() + year.toString();
  console.log(currId)
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
      console.log(data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [user?.uid, isEditMode]);
  
    return(
  
      <div className="home">
        <Sidebar/>
        <div className = "calendar">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar defaultValue={today} minDate={today} maxDate={today} />
          </LocalizationProvider>
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
            <div className="display" key={data.log}>
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