import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import AuthContext from "../../../context/AuthContext";

const EditPostModal = () => {
  const {
    authTokens,
    logoutUser,
    user,
    setToggle,
    toggle,
    postInfo,
    setPostInfo,
  } = useContext(AuthContext);
  let [editPostContent, setEditPostContent] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    setEditPostContent(e.target.value);
  };

  const editPost = async () => {
    const response = await fetch(
      `http://127.0.0.1:8000/main/post-update/${postInfo.id}/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
        body: JSON.stringify({
          post_content: editPostContent,
        }),
      }
    );
    const data = await response.json();
    console.log(data);
    console.log(user);
    if (user.first_name === data.created_by.first_name) {
      console.log("hihihi");
      setToggle(!toggle);
      handleCloseModal();
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    }
  };

  const handleCloseModal = () => {
    setPostInfo(null);
    setEditPostContent("");
  };
  return (
    <>
      <div
        className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
        id="editPostModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
          <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md bg-blue-600">
              <h5
                className="text-xl font-medium leading-normal text-white"
                id="exampleModalLabel"
              >
                Edit Post
              </h5>
              {/* <button
                type="button"
                className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button> */}
            </div>
            <div className="modal-body relative p-4">
              <div className="mb-10">
                <div>Current Post:</div> {postInfo?.post_content}
              </div>
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
                placeholder="Edit your post here"
                name="editPostbox"
                value={editPostContent}
                onChange={handleChange}
              />
            </div>
            <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4  rounded-b-md">
              <button
                type="button"
                className="inline-block px-6 py-2.5 bg-blue-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-600 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out "
                data-bs-dismiss="modal"
                onClick={handleCloseModal}
              >
                Go Back
              </button>
              <button
                type="button"
                className="inline-block px-6 py-2.5 bg-green-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                data-bs-dismiss="modal"
                onClick={() => editPost()}
              >
                Edit Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditPostModal;
