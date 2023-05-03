import React, { useState } from "react";
import "../loginComponent/login.css";

export const Register = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fname, setfName] = useState("")
    const [lname, setlName] = useState("")
    const [title, settitle] = useState("Mr")

    const handelSubmit =async (e) => {
        e.preventDefault();          
    }
    
let signUp=async ()=>{
    let item={fname,lname,email,password,title}
  let result= await fetch("/authors",{
    method:"POST",
    body:JSON.stringify(item),
    headers:{
        "Content-Type":"application/json",
        "Accept":"application/json"
    }
})
result= await result.json()
console.log(result)
localStorage.setItem("user_info",JSON.stringify(result))
}
    return (
        <>
            <div className="center">
                <h1>Register</h1>
                <form onSubmit={handelSubmit}>

                    <label htmlFor="title">Title:</label>
                    <select className="inputs" id="title" onChange={e=>{settitle(e.target.value)}}>
                        <option >Mr</option>
                        <option >Mrs</option>
                        <option >Miss</option>
                    </select>
                    <br></br>

                    <label htmlFor="firstname"> firstName : </label>
                    <input className="inputs" onChange={(e) => { setfName(e.target.value) }} type="text" placeholder="your First Name" id="firstname" name="firstname" value={fname} />

                    <label htmlFor="lastname"> lastName : </label>
                    <input className="inputs" onChange={(e) => { setlName(e.target.value) }} type="text" placeholder="your last Name" id="lastname" name="lname" value={lname} />

                    <label htmlFor="Email"> email : </label>
                    <input className="inputs" onChange={(e) => { setEmail(e.target.value) }} type="email" placeholder="youremail@gmail.com" name="email" id="Email" value={email} />


                    <label htmlFor="password"> Password : </label>

                    <input className="inputs" onChange={(e) => { setPassword(e.target.value) }} type="password" placeholder="*******" value={password} name="password" id="password" />

                    <button onClick={signUp} className="login" >Login kre...</button>

                </form>

                <div className="do_a">

                    <button onClick={() => { props.onFormSwitch("login") }}>"have account do login" </button>

                </div>

            </div>
        </>

    )
}

// export default Register;