import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import AuthContext from "../../../context/AuthContext";

import dayjs from "dayjs";

import {
  BsThreeDots,
  BsTrash,
  BsPencilSquare,
  BsPencil,
  BsChatLeftText,
  BsBookmark,
  BsClock,
} from "react-icons/bs";

const CommentModal = () => {
  const [comments, setComments] = useState([]);
  const [addComment, setAddComment] = useState("");
  const {
    authTokens,
    logoutUser,
    user,
    setToggle,
    toggle,
    postInfo,
    setPostInfo,
  } = useContext(AuthContext);

  useEffect(() => {
    getComments();
    // console.log(user);
  }, [toggle]);

  const getComments = async () => {
    const response = await fetch(
      `http://127.0.0.1:8000/main/all-comment-details/${postInfo.id}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      }
    );
    const data = await response.json();
    console.log(data);
    console.log(response);
    if (response.status === 200) {
      setComments(data);
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    }
  };

  const handleChange = async (e) => {
    e.preventDefault();
    setAddComment(e.target.value);
  };

  const handleSubmit = async () => {
    const response = await fetch(
      `http://127.0.0.1:8000/main/comment-create/${postInfo.id}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
        body: JSON.stringify({
          post_comment_content: addComment,
        }),
      }
    );
    const data = await response.json();
    console.log(data);
    console.log(response);
    if (response.status === 200) {
      console.log(data);
      console.log("hi");
      setToggle(!toggle);
      setAddComment("");
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    }
  };

  return (
    <>
      <div
        className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
        id="commentModalInfo"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="CardModalInfoLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable relative w-auto pointer-events-none">
          <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md bg-blue-600">
              <div id="CardModalInfoLabel">
                <div className="font-bold text-xl mb-2 text-white">
                  Comment Section
                </div>
                {/* <p className="text-gray-700 text-base">{"No Desc"}</p> */}
              </div>
              <button
                type="button"
                className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body relative p-4">
              {/* {true && (
                  <span className="flex h-3 w-3 float-right ">
                    <span className=" relative inline-flex rounded-full h-3 w-3 bg-sky-500 top-4">
                      <span className="animate-ping relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                    </span>
                  </span>
                )} */}
              {postInfo &&
                (user.user_id === postInfo.created_by.id ? (
                  <div className=" mb-4 flex justify-end">
                    <div className="flex items-center justify-self-end text-sm">
                      <div className="flex flex-col mr-3">
                        <div className=" bg-blue-400 rounded-l-lg rounded-tr-lg p-2 text-white">
                          <div className="underline">{`${postInfo.created_by.first_name} ${postInfo.created_by.last_name}`}</div>
                          {postInfo.post_content}
                        </div>
                        <div className="text-xs text-gray-500">
                          <div className="flex items-center justify-self-end ">
                            <BsClock className="mr-2" />
                            {dayjs(postInfo.created_at).format(
                              "h:mm A - MMM D, YYYY"
                            )}
                          </div>
                        </div>
                      </div>

                      <div>
                        {postInfo.created_by.is_admin === true && (
                          <span className="flex h-3 w-3 float-right ">
                            <span className=" relative inline-flex rounded-full h-3 w-3 bg-sky-500 top-0 right-4">
                              <span className="animate-ping relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                            </span>
                          </span>
                        )}
                        <img
                          src={postInfo.created_by.image}
                          alt="profile pic"
                          className="w-16 rounded-full "
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className=" mb-4">
                    <div className="flex items-center justify-self-end text-sm ">
                      <div>
                        {postInfo.created_by.is_admin === true && (
                          <span className="flex h-3 w-3 float-right ">
                            <span className=" relative inline-flex rounded-full h-3 w-3 bg-sky-500 top-1 right-4">
                              <span className="animate-ping relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                            </span>
                          </span>
                        )}
                        <img
                          src={postInfo.created_by.image}
                          alt="profile pic"
                          className="w-16 rounded-full "
                        />
                      </div>
                      <div className="flex flex-col ml-3">
                        <div className=" bg-blue-400 text-white rounded-r-lg rounded-tl-lg p-2">
                          <div className="underline">{`${postInfo.created_by.first_name} ${postInfo.created_by.last_name}`}</div>
                          {postInfo.post_content}
                        </div>
                        <div className="text-xs text-gray-500">
                          <div className="flex items-center justify-self-end ">
                            <BsClock className="mr-2" />
                            {dayjs(postInfo.created_at).format(
                              "h:mm A - MMM D, YYYY"
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              {comments.map((comment) =>
                user.user_id === comment.created_by.id ? (
                  <li
                    key={comment.id}
                    className="list-none mb-4 flex justify-end"
                  >
                    <div className="flex items-center justify-self-end text-sm ">
                      <div className="flex flex-col ml-3">
                        <div className=" bg-gray-200 rounded-l-lg rounded-tr-lg p-2">
                          <div className="underline">{`${comment.created_by.first_name} ${comment.created_by.last_name}`}</div>
                          {comment.post_comment_content}
                        </div>
                        <div className="text-xs text-gray-500">
                          <div className="flex items-center justify-self-end ">
                            <BsClock className="mr-2" />
                            {dayjs(comment.created_at).format(
                              "h:mm A - MMM D, YYYY"
                            )}
                          </div>
                        </div>
                      </div>
                      <div>
                        {comment.created_by.is_admin === true && (
                          <span className="flex h-3 w-3 float-right ">
                            <span className=" relative inline-flex rounded-full h-3 w-3 bg-sky-500 top-0 right-4">
                              <span className="animate-ping relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                            </span>
                          </span>
                        )}
                        <img
                          src={comment.created_by.image}
                          alt="profile pic"
                          className="w-16 rounded-full "
                        />
                      </div>
                    </div>
                  </li>
                ) : (
                  <li key={comment.id} className="list-none mb-4">
                    <div className="flex items-center justify-self-end text-sm ">
                      <div>
                        {comment.created_by.is_admin === true && (
                          <span className="flex h-3 w-3 float-right ">
                            <span className=" relative inline-flex rounded-full h-3 w-3 bg-sky-500 top-0 right-4">
                              <span className="animate-ping relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                            </span>
                          </span>
                        )}
                        <img
                          src={comment.created_by.image}
                          alt="profile pic"
                          className="w-16 rounded-full "
                        />
                      </div>
                      <div className="flex flex-col ml-3">
                        <div className=" bg-gray-200 rounded-r-lg rounded-tl-lg p-2">
                          <div className="underline">{`${comment.created_by.first_name} ${comment.created_by.last_name}`}</div>
                          {comment.post_comment_content}
                        </div>
                        <div className="text-xs text-gray-500">
                          <div className="flex items-center justify-self-end ">
                            <BsClock className="mr-2" />
                            {dayjs(comment.created_at).format(
                              "h:mm A - MMM D, YYYY"
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                )
              )}
              {/* {JSON.stringify(storeCardModalData)} */}
              {/* {selectedCardData[0]
                ? selectedCardData[0].comments.map((comment, i) => (
                    <div key={i}>
                      <div className=" w-full flex  border-t border-grey-200 shadow-md ">
                        <form className="w-full p-4">
                          <div class="mb-2">
                            <div for="comment" className="text-base text-black">
                              {comment.commentValue}
                            </div>
                          </div>
                          {storeCardModalStatus !== "complete" && (
                            <button
                              type="button"
                              className="px-3 py-2 text-sm text-blue-100 bg-red-600 rounded float-right"
                              onClick={() => removeComment(comment._id)}
                            >
                              Delete
                            </button>
                          )}
                        </form>
                      </div>
                    </div>
                  ))
                : "no Comment"} */}

              <br />
              <br />
              <p>added comment will appear above</p>
            </div>
            <div className=" w-full flex  border-t border-grey-200 shadow-md ">
              <form action="" className="w-full p-4">
                <div class="mb-2">
                  <label for="comment" className="text-base text-gray-600">
                    Add a comment
                  </label>
                  <textarea
                    className="w-full h-20 p-2 border rounded focus:outline-none focus:ring-gray-300 focus:ring-1"
                    name="comment"
                    placeholder=""
                    value={addComment}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <button
                  type="button"
                  className="px-3 py-2 text-sm text-blue-100 bg-blue-600 rounded"
                  onClick={handleSubmit}
                >
                  Comment
                </button>
              </form>
            </div>
            {/* <div className=" flex flex-wrap items-center justify-end p-4 border-t border-gray-200 "> */}

            {/* </div> */}
            <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md bg-gray-200">
              {" "}
              <button
                type="button"
                className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                data-bs-toggle="modal"
                data-bs-target="#editCardModal"
              >
                Edit Card Info
              </button>
              <button
                type="button"
                className="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentModal;
