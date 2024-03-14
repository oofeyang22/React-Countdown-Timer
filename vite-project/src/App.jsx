import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import CountdownTimer from './components/CountdownTimer'
// Create a Date object for the future time
let futureDate = new Date("June 7, 2024 12:00:00");

// Get the timestamp in milliseconds for the future time
let futureTimestamp = futureDate.getTime();

function App() {

  return (

    <CountdownTimer countdownTimestampMs={futureTimestamp}/>
  )
}

export default App
