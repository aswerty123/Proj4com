import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../../context/AuthContext";

const RemovePostModal = (props) => {
  const { authTokens, logoutUser, user, setToggle, toggle, postInfo } =
    useContext(AuthContext);

  const deletePost = async () => {
    const response = await fetch(
      `http://127.0.0.1:8000/main/post-delete/${postInfo.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      }
    );
    const data = await response.json();
    console.log(data);
    if (data === "item deleted") {
      setToggle(!toggle);
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    }
  };
  return (
    <>
      <div
        className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
        id="removePostModal"
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
                Remove Post Confirmation
              </h5>
              {/* <button
                type="button"
                className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button> */}
            </div>
            <div className="modal-body relative p-4">
              Do you wish to proceed in removing the post?
            </div>
            <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4  rounded-b-md">
              <button
                type="button"
                className="inline-block px-6 py-2.5 bg-blue-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-600 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out "
                data-bs-dismiss="modal"
              >
                Go Back
              </button>
              <button
                type="button"
                className="inline-block px-6 py-2.5 bg-red-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-600 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                data-bs-dismiss="modal"
                onClick={() => deletePost()}
              >
                Remove Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RemovePostModal;
