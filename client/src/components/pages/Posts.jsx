import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await axios.get("http://localhost:3001/posts");
        if (response.data && response.data.posts) {
          setPosts(response.data.posts);
        } else {
          setPosts([]); 
        }
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Failed to load posts. Please try again later.");
      }
    };

    getPost();
  }, []);

  return (
    <>
      {error && <p className="error">{error}</p>} {/* Show error message if any */}
      
      {posts.length > 0 ? (
        posts.map((data) => (
          <div className="post" key={data.id}>
            <div className="image">
              <Link to={`/post/${data.id}`}>
                <img src={`http://localhost:3001/uploads/${data.img}`} className="img" alt={data.title} />
              </Link>
            </div>
            <div className="texts">
              <h3>
                <Link className="link" to={`/post/${data.id}`}>
                  {data.title}
                </Link>
              </h3>
              <p className="info" id="info">
                <p className="author">@{data.username}</p>
              </p>
              <p className="summary">
                {data.content.slice(0, 200)}{" "}
                <Link to={`/post/${data.id}`}>
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




































/*import React from "react";
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

*/
