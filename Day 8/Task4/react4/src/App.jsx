import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App({name,major,year}){
name="Swathi";
major="Information Technology";
year="3";
return(
  <>
  <h1>Swathi</h1>
  <p><strong>name:</strong>{name}</p> 
  <p><strong>major:</strong>{major}</p> 
  <p><strong>year:</strong>{year}</p>
  
  </>
)
}
export default App;
  