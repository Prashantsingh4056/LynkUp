import React from 'react'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './Components/Navbar'

function App() {
  return (
    <div>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
      <Outlet/>
    </div>
  )
}

export default App