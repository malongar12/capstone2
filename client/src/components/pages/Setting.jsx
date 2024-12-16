import React from "react";
import "../css/setting.css";
import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { userContext } from "../context/UserContext";
import { useContext } from "react";

const Setting = () => {
  const navigate = useNavigate()
  const { token, logout } = useContext(userContext);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);

  const deleteAccount = async (e) =>{
    e.preventDefault();

    try{
    await axios.delete("http://localhost:3001/delete/user", {
      headers: {
        'Authorization': `Bearer ${token}`,
        
      }
    }).then(response => {
      if (response.data.message) {
        logout()
        navigate("/")
        
      }
    })
  }catch(error){
    console.log(error)
  }

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", fileInput.files[0]);
    formData.append("username", userName);
    formData.append("email", email);
    formData.append("password", password);

    try {
         let response = await axios.patch("http://localhost:3001/edit/user", formData, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
        })

        if (response.statusText === "OK") {
          navigate("/")
        }
  
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
          <span className="settingsTitleDelete" onClick={deleteAccount}>Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            {file && (
              <img
                className="writeImg"
                src={URL.createObjectURL(file)}
                alt=""
              />
            )}
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>{" "}
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="settingsPPInput"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder="Malongar"
            name="username"
            onChange={(e) => setUserName(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder="malongar@gmail.com"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="settingsSubmitButton" type="submit">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default Setting;
