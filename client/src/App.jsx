import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { RouterProvider } from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import { router } from './Routes/router';
import 'animate.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <ToastContainer/>
     <RouterProvider router = {router}></RouterProvider>
    </>
  )
}

export default App
