import React, { useState } from 'react';
import "./login.scss";
import {Link, useNavigate} from "react-router-dom";
import newRequest from '../../utils/newRequest';


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("null");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const res = await newRequest.post("/auth/login", {email,password});
        localStorage.setItem("currentUser", JSON.stringify(res.data));

        if(res.data.isAdmin){
            navigate("/");
        } 
    } catch (err) {
      setError(err.response.data);
      console.log(err.response.data);
    }
  };

  return (
    <div className="login">
      <div className="container">
        <div className="wrapper">
          <h1>SIGN IN</h1>
          <form action="" onSubmit={handleSubmit}>
            <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
            <button>LOGIN</button>
            <Link className="link"><span>DO NOT YOU REMEMBER THE PASSWORD?</span></Link>
            <Link className="link"><span>CREATE A NEW ACCOUNT</span></Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
