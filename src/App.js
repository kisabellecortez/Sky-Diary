import './App.css';
import { AuthContextProvider } from './context/AuthContext.js'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home.js'
import SignIn from './pages/SignIn.js'
import SignUp from './pages/SignUp.js'

function App() {
  return (
    <div>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<SignIn/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/signin" element={<SignIn/>}/>
            <Route path="/signup" element={<SignUp/>}/>
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
