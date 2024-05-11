import React from 'react'
import {BrowserRouter,Routes,Route, useNavigate} from 'react-router-dom'
import {Signup} from './Pages/Signup'
import {Signin} from './Pages/Signin'
import {Send} from './Pages/Send'
import {Dashboard} from './Pages/Dashboard'
function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="signin" element={<Signin/>}></Route>
          <Route path="/Dashboard" element={<Dashboard/>}></Route>
          <Route path="/sendMoney" element={<Send/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
