import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";

const InputPost = () => {
  const { authTokens, logoutUser, setToggle, toggle } = useContext(AuthContext);

  const [enterPost, setEnterPost] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setEnterPost(e.target.value);
  };

  const handleSubmit = async () => {
    const response = await fetch("http://127.0.0.1:8000/main/post-create/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
      body: JSON.stringify({
        post_content: enterPost,
      }),
    });
    const data = await response.json();
    if (response.status === 200) {
      console.log(data);
      console.log("hi");
      setToggle(!toggle);
      setEnterPost("");
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    }
  };

  return (
    <div>
      <div className="relative p-4 w-full bg-white rounded-lg overflow-hidden shadow hover:shadow-md mb-4">
        <textarea
          className="
        form-control
        block
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none w-11/12 
      "
          rows="3"
          placeholder="Write down your post here"
          name="postbox"
          value={enterPost}
          onChange={handleChange}
        />
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 m-2 rounded float-right"
          onClick={handleSubmit}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default InputPost;
