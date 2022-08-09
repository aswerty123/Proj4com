import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { proj4comActions } from "../../store/proj4com";

const ListOfPost = () => {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const storeAuthTokens = useSelector((state) => state.proj4com.authTokens);

  const navigate = useNavigate();

  useEffect(() => {
    getPosts();
  }, []);

  const logoutUser = () => {
    dispatch(
      proj4comActions.storeAuthTokenAndUserInfo({
        authTokens: null,
        user: null,
      })
    );
    localStorage.removeItem("authTokens");
    navigate("/login");
  };

  const getPosts = async () => {
    const response = await fetch(
      "http://127.0.0.1:8000/main/all-post-details/",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(storeAuthTokens.access),
        },
      }
    );
    const data = await response.json();
    if (response.status === 200) {
      setPosts(data);
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    }
  };
  return (
    <div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <div>{post.created_by}</div>
            <div>{post.post_content}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListOfPost;
