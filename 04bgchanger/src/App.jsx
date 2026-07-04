
import { useState } from "react"
function App() {
  const [color,setColor]=useState("olive")
    return (
    <>
    <div className="w-full h-screen duration-200 "
    style ={{backgroundColor: color}}
    >
      <div className="fixed bottom-10 inset-x-0 flex items-center justify-around h-18 bg-amber-200 shadow-lg">
        <button onClick={()=> setColor("blue")}
        className="bg-blue-500 text-white px-4 py-2 rounded-3xl">
        blue
        </button>
        <button onClick={()=> setColor("red")}
        className="bg-red-500 text-white px-4 py-2 rounded-3xl">
        red
        </button>
        <button onClick={()=> setColor("green")}
         className="bg-green-400 text-white px-4 py-2 rounded-3xl">
        green
        </button>
        <button onClick={()=> setColor("yellow")}
        className="bg-amber-300 text-white px-4 py-2 rounded-3xl">
        yellow
        </button>
      </div>
    </div>
      
    </>
  )
}

export default App
