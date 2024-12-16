import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import axios from "axios";
import { userContext } from "../context/UserContext";
import { useContext } from "react";

const EditPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const { token } = useContext(userContext);
  const [error, setError] = useState("")
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      await axios.get(`http://localhost:3001/post/${id}`).then((response) => {
        setTitle(response.data.title);
        setContent(response.data.content);
      });
    };
    getData();
  }, []);

  /// edit post

  const handleEditPost = async (e) => {
    e.preventDefault();
    const newForm = new FormData();
    newForm.append("file", fileInput.files[0]);
    newForm.append("title", title);
    newForm.append("content", content);

    let response = await axios.patch(
      `http://localhost:3001/post/edit/${id}`,
      newForm,
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
      }
    );
    if (response.data.error) {
        setError(response.data.error)
    }else{
      navigate("/")

    }
   
    console.log(response)
  };

  return (
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}

      <form
        className="writeForm"
        onSubmit={handleEditPost}
        encType="multipart/form-data"
        method="POST"
      >
        <div className="writeFormGroup">
          <span style={{ color: "red" }}>{error}</span>
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            type="text"
            className="writeInput writeText"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          Edit
        </button>
      </form>
    </div>
  );
};

export default EditPost;
