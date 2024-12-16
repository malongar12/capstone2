import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../css/posts.css";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  useEffect(()=> {
    const getPost = async()=> {
      await axios.get("http://localhost:3001/posts")
      .then(response => {
        setPosts(response.data.posts)
      })
    };
    getPost()

  }, [])
 

  return (
   <>
   {posts.length > 0 ? (
        posts.map((data) => (
          <div className="post" key={data.id}> 
            <div className="image">
              <Link to={`/post/${data.id}`}>
              <img src={`http://localhost:3001/uploads/${data.img}`} className="img"/> 
              
              </Link>
              
            </div>
            <div className="texts">
              <h3><Link className="link" to={`/post/${data.id}`}>{data.title}</Link> </h3>
              <p className="info" id="info">
                <p className="author">@{data.username}</p>
                
                </p>
              <p className="summary">
                {data.content.slice(0, 200)} <Link to={`post/${data.id}`}>
                <div>
                  <button className="readMore-btn">Read More</button>
                </div>
                </Link>
              </p>
            </div>
          </div>
        ))
      ) : (
        <p>No posts available</p>
      )}
     
    

     </>
  );
};

export default Posts;
