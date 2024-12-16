import React, { useContext } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { userContext } from "../context/UserContext";
import "../css/posts.css";

const SinglePost = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [SinglePost, setSinglePost] = useState();
  const [error, setError] = useState("");
  const { user, token } = useContext(userContext);

  useEffect(() => {
    const singlePost = async () => {
      await axios.get(`http://localhost:3001/post/${id}`).then((response) => {
        setSinglePost(response.data);

      });
    };
    singlePost();
  }, []);
  const deletePost = async (id) => {
    await axios
      .delete(`http://localhost:3001/post/delete/${SinglePost.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (!response.data.message) {
          setError(response.data.error);
        } else {
          navigate("/");
        }
      });
  };

  return (
    <>
      <div>
        <p>{error}</p>
      </div>

      {SinglePost ? (
        <div className="singlePost">
          <div className="singlePostWrapper">
            <img
              className="singlePostImg"
              src={`http://localhost:3001/uploads/${SinglePost.img}`}
              alt=""
            />
            <h1 className="singlePostTitle">
              {SinglePost.title}
              {SinglePost.username === user?.username && (
                <div className="singlePostEdit">

                  <Link to= {`/post/edit/${SinglePost.id}`}>Edit</Link>

                  <i
                    class="singlePostIcon   fa fa-trash"
                    onClick={ deletePost}
                  ></i>
                </div>
              )}
            </h1>
            <div className="singlePostInfo">
              <span>
                Author:
                <b className="singlePostAuthor">{SinglePost.username}</b>
              </span>
              <span>1 day ago</span>
            </div>
            <p className="singlePostDesc">
              {SinglePost.content}
              <br />
            </p>
          </div>
        </div>
      ) : (
        //

        <div>Loading</div>
      )}
    </>
  );
};

export default SinglePost;
