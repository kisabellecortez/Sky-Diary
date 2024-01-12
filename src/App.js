import './App.css';
import { AuthContextProvider } from './context/AuthContext.js'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import Home from './pages/Home.js'
import SignIn from './pages/SignIn.js'
import SignUp from './pages/SignUp.js'
import Settings from './pages/Settings.js'
import Reminisce from './pages/Reminisce.js'
import ProtectedRoute from './components/ProtectedRoute';

function App({children}){

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      {children}
    </LocalizationProvider>
    
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<SignIn/>}/>
            <Route
            path='/home'
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path='/reminisce'
            element={
              <ProtectedRoute>
                <Reminisce />
              </ProtectedRoute>
            }
          />
          <Route
            path='/settings'
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
            
            <Route path="/signin" element={<SignIn/>}/>
            <Route path="/signup" element={<SignUp/>}/>
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;