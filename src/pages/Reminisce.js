import Sidebar from '../nav/Sidebar.js';
import React, { useEffect, useState } from 'react';

import { UserAuth } from '../context/AuthContext.js'
import dayjs from 'dayjs';
import Grid from '@mui/material/Grid';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import {getDocs, collection } from 'firebase/firestore'
import { db } from '../firebase.js'

const today = dayjs();
const d = new Date(2024, 0, 1)
const begin = dayjs(d)

export default function Reminisce() {

  const { user } = UserAuth();

  const [data, setData] = useState();
  const [value, setValue] = React.useState(today);


  const [documentExists, setDocumentExists] = useState(false);

  var documentId = (value.get('date')).toString() + (value.get('month')).toString() + (value.get('year'))

  useEffect(() => {
    const checkDocumentExists = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, user?.uid));
        const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setData(data);
        console.log(data)

        if(data.find((entry) => entry.id === documentId)){
        setDocumentExists(true)
        }
        else{
          setDocumentExists(false)
        }
      } catch (error) {
        console.error('Error checking document:', error);
      }
    };

    checkDocumentExists();
 
  }, [user?.uid, documentId]);

  console.log(value)
  console.log(documentId)

  return (
    <div className="reminisce">
      <Sidebar />

      <div className="calendar">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid
        container
        columns={{ xs: 1, lg: 2 }}
        spacing={4}
        alignItems="center"
        justifyContent="center"
      >
        <Grid item>
          <DateCalendar value={value} onChange={(newValue) => setValue(newValue)} minDate={begin} maxDate={today} defaultValue={today}/>
        </Grid>
        
      </Grid>
    </LocalizationProvider>
    </div>
    <div className="logBox">
      <div className="display">
      {documentExists ? (

          <p>{data.find((entry) => entry.id === documentId)?.string}</p>
          
        ) : (
          <p>YOU DIDN'T WRITE AN ENTRY ON THIS DAY.</p>
        )}
        </div>
        
      </div>
    </div>
  );
}
