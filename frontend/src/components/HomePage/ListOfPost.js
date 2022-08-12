import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import AuthContext from "../../context/AuthContext";

import RemovePostModal from "./Modals/RemovePostModal";
import EditPostModal from "./Modals/EditPostModal";
import CommentModal from "./Modals/CommentModal";
// import { useSelector, useDispatch } from "react-redux";
// import { proj4comActions } from "../../store/proj4com";

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

const ListOfPost = () => {
  // const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const { authTokens, logoutUser, user, setToggle, toggle, setPostInfo } =
    useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    getPosts();
    // console.log(user);
  }, [toggle]);

  const getPosts = async () => {
    const response = await fetch(
      "http://127.0.0.1:8000/main/all-post-details/",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
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

  //----------------------------------------
  const handleOpenCardModal = (info) => {
    setPostInfo(info);
    setToggle(!toggle);
  };
  return (
    <div>
      <RemovePostModal />
      <EditPostModal />
      <CommentModal />
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <div className="relative p-4 w-full bg-white rounded-lg shadow  hover:shadow-md mb-4">
              <div className="flex items-stretch mb-5">
                <div
                  className="animate-bounce cursor-pointer"
                  onClick={() => {
                    navigate(`/profile/${post.created_by.id}`);
                  }}
                >
                  {post.created_by.is_admin === true && (
                    <span className="flex h-3 w-3 float-right ">
                      <span className=" relative inline-flex rounded-full h-3 w-3 bg-sky-500 top-4">
                        <span className="animate-ping relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                      </span>
                    </span>
                  )}
                  <img
                    src={post.created_by.image}
                    alt="profile pic"
                    className="w-16 rounded-full "
                  />
                </div>
                <div className="flex justify-between  w-full ml-3">
                  <div className="w-10/12 h-3 rounded self-center">
                    {`${post.created_by.first_name} ${post.created_by.last_name}`}
                  </div>
                </div>
                {
                  <div clasName="flex justify-center">
                    <div>
                      <div className="dropdown relative">
                        <button
                          className="
                          dropdown-toggle
                          flex self-start text-gray-500 hover:bg-gray-200 p-2 rounded-full
                        "
                          type="button"
                          id="dropdownMenuButton1"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <BsThreeDots size={20} />
                        </button>
                        <ul
                          className="
                          dropdown-menu
                          min-w-max
                          absolute
                          hidden
                          bg-white
                          text-base
                          z-50
                          float-left
                          py-2
                          list-none
                          text-left
                          rounded-lg
                          shadow-lg
                          mt-1
                          m-0
                          bg-clip-padding
                          border-none
                         
                        "
                          aria-labelledby="dropdownMenuButton1"
                        >
                          <li className="hover:bg-gray-100 mx-2 py-2">
                            <div className="flex items-center justify-self-end mr-24 text-sm hover:bg-gray-100">
                              <BsBookmark className="mx-4" /> Save Post
                            </div>
                          </li>

                          {user.user_id === post.created_by.id && (
                            <>
                              <li className="hover:bg-gray-100 mx-2 py-2 ">
                                <div
                                  className="flex items-center justify-self-end mr-24 text-sm hover:bg-gray-100"
                                  data-bs-toggle="modal"
                                  data-bs-target="#editPostModal"
                                  onClick={() => handleOpenCardModal(post)}
                                >
                                  <BsPencilSquare className="mx-4" /> Edit Post
                                </div>
                              </li>
                              <li
                                className="hover:bg-gray-100 mx-2 py-2 hover:text-red-500"
                                data-bs-toggle="modal"
                                data-bs-target="#removePostModal"
                                onClick={() => handleOpenCardModal(post)}
                              >
                                <div className="flex items-center justify-self-end mr-24 text-sm hover:bg-gray-100 ">
                                  <BsTrash className="mx-4 " /> Remove Post
                                </div>
                              </li>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                }
                {/* {user.user_id === post.created_by.id && (
                  <div className="flex self-start text-gray-200 hover:text-red-500">
                    <ImCross onClick={() => handleDeletePost(post.id)} />
                  </div>
                )} */}
              </div>
              <div className=" flex flex-col">
                <textarea
                  className="rounded w-full max-h-full bg-cyan-200 mb-4 overflow-y-scroll"
                  value={post.post_content}
                  readOnly
                >
                  {/* {post.post_content} */}
                </textarea>

                <div className="text-gray-500 text-sm">
                  <div className="flex items-center justify-self-end ">
                    <BsClock className="mr-2" />
                    {post.created_at.split(".")[0] ===
                    post.updated_at.split(".")[0] ? (
                      dayjs(post.created_at).format("h:mm A - MMM D, YYYY")
                    ) : (
                      <div className="flex items-center justify-self-end ">
                        <div>
                          {dayjs(post.updated_at).format(
                            "h:mm A - MMM D, YYYY"
                          )}
                        </div>
                        <BsPencil className="ml-2" /> <div>{"(edited)"}</div>
                      </div>
                    )}
                  </div>
                  <div
                    className="flex items-center justify-self-end mr-24 hover:bg-gray-100 hover:text-black cursor-pointer p-2 w-48"
                    data-bs-toggle="modal"
                    data-bs-target="#commentModalInfo"
                    onClick={() => handleOpenCardModal(post)}
                  >
                    <BsChatLeftText className="mx-2" />{" "}
                    {post.comment_count
                      ? `View ${post.comment_count} Comment`
                      : `No Comment`}
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListOfPost;
