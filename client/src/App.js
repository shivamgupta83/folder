import './components/loginComponent/login.css';
import { useState } from "react";
import {Register} from "./components/resisterComponent/resister";
import {Login} from "./components/loginComponent/login";
function App() {
const [currentForm,setCurrenForm] =useState("login");
let toggleForm=(formName)=>{
  setCurrenForm(formName)
}
  return (
    <>
      {
        currentForm==="login" ? <Login onFormSwitch={toggleForm}/> : <Register  onFormSwitch={toggleForm}/>
      }
    </>
  )
}

export default App;
