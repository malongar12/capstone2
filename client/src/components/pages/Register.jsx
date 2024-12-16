import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "../css/login.css"
import { BrowserRouter as Router, Route, Link, Routes, useNavigate } from "react-router-dom";
  const Register = () => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")
  const navigate = useNavigate();


  const handleRegister = async(e) => {
    e.preventDefault();
    await axios.post("http://localhost:3001/register", {
      username,
      email,
      password
    })
    .then(response => {
     if (response.data.error) {
      setError(response.data.error)
     }else{
      navigate("/login")
     }
    })

  }

 
  
    return (
      <div className="auth-div">
        <h1>Register</h1>
        <span style={{ color: 'red' }}>{error}</span>
        <form  onSubmit={handleRegister}>
          <input
            required
            type="text"
            placeholder="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
           
          />
          <input
            required
            type="email"
            placeholder="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          
          />
          <input
            required
            type="password"
            placeholder="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button>Register</button>
          
          <span>
            Do you have an account? <Link to="/login">Login</Link>
          </span>
        </form>
      </div>
    );
  };
  
export default Register;