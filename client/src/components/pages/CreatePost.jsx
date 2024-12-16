import React from "react";
import { useState, useContext } from "react";
import { userContext } from "../context/UserContext";
import { useNavigate } from "react-router";
import axios from "axios";

const CreatePost = () => {
  const { token } = useContext(userContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("")
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", fileInput.files[0]);
    formData.append("title", title);
    formData.append("content", content);

    try {
      const response = await axios.post("http://localhost:3001/create/post", formData, {
        headers: {
          'Authorization': `Bearer ${token}`, 
        }
  
      })
      
      if (response.data.message) {
        navigate("/")
      }
      else{
        setError(response.data.error)

      }

     
  
      
    } catch (error) {
      console.log(error.message)
    }

    

    
  }
    

    
  return (
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form
        className="writeForm"
        onSubmit={handleSubmit}
       encType="multipart/form-data" method="POST"
      >
        <div className="writeFormGroup">
        <span style={{ color: 'red' }}>{error}</span>
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            name="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            type="text"
            className="writeInput writeText"
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
