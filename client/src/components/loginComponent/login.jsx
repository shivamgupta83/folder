import React, { useState } from "react";
import "./login.css";

export const Login = (props) => {
    console.log(props.onFormSwitch)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handelSubmit = (e) => {
        e.preventDefault();
        console.log(email)
        console.log(password)
    }

    return (
        <>
            <div className="center">
                <h1>Login form</h1>

                <form onSubmit={handelSubmit}>

                    <label htmlFor="Email" > email : </label>

                    <input className="inputs" onChange={(e) => { setEmail(e.target.value) }} type="email" placeholder="youremail@gmail.com" id="email" name="email" />

<br/>
                    <label  htmlFor="password"> Password : </label>

                    <input className="inputs" onChange={(e) => { setPassword(e.target.value) }} type="password" placeholder="*******" name="password" id="password" />
<br/>
                    <button className="login" >Login kre...</button>

                </form>
<br/>
                <div className="do_a">

                    <button onClick={() => { props.onFormSwitch("register") }}>"Dont have account ?" </button>

                </div>

            </div>
        </>

    )
}

// export default Login;