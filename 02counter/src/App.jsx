import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  let [counter, setCounter]=useState(15);
  const addValue=()=>{
    //console.log("value added",Math.random());
    console.log("clicked",counter);
    setCounter(counter+1);
  }
  const removeValue=()=>{
    console.log("clicked",counter);
    setCounter(counter-1);
  }
  return (
    <>
    <h1>chai aur reactu</h1>
    <h2>counter value: {counter}</h2>

    <button
    onClick={addValue}>add value</button>
    <br />
    <button
    onClick={removeValue}>remove value</button>

      
    </>
  )
}

export default App
