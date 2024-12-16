import React from "react";
import { useEffect, useState, useContext,} from "react";
import "../css/login.css"
import { userContext } from "../context/UserContext";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';



const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")
  const { setUser, user } = useContext(userContext); 
  const navigate = useNavigate()



    const handleLogin = async (e) =>{
      e.preventDefault();

      try {

        await axios.post("http://localhost:3001/login", {
          username,
          password
        })
        .then(response => {
    
          if (response.data.error) {
            setError(response.data.error)
          }else{
           localStorage.setItem("token", response.data.token)
            setUser({
              username: response.data.username,
              img: response.data.img,
              id: response.data.id
            })
    
            navigate("/")
            
    
          }
        })
        
      } catch (error) {
        console.log(error)
      }
  
      
      
    };
  
    



  return (
    <div className="auth-div">
    <h1>Login</h1>
    <span style={{ color: 'red' }}>{error}</span>
    <form  onSubmit={handleLogin}>
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
        type="password"
        placeholder="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      
      />
      <button>Login</button>
          
          <span>
            Do you have an account? <Link to="/register">Register</Link>
          </span>

      </form>

      </div>
  )



}


export default Login;