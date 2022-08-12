import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import AuthContext from "../../context/AuthContext";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const { authTokens, logoutUser, user, setToggle, toggle, setPostInfo } =
    useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
    // console.log(user);
  }, [toggle]);

  const getUsers = async () => {
    const response = await fetch("http://127.0.0.1:8000/main/account-list/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    const data = await response.json();
    if (response.status === 200) {
      setUsers(data);
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    }
  };

  let randomListOfUsers = [];

  for (let i = 0; i < 3; i++) {
    const randomNumber = Math.floor(Math.random() * users.length);
    randomListOfUsers.push(
      <div className="mb-4 border-b-2 p-4">
        <div
          className=" cursor-pointer"
          onClick={() => {
            navigate(`/profile/${users[randomNumber]?.id}`);
          }}
        >
          {users.is_admin === true && (
            <span className="flex h-3 w-3 float-right ">
              <span className=" relative inline-flex rounded-full h-3 w-3 bg-sky-500 top-4">
                <span className="animate-ping relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
              </span>
            </span>
          )}
          <img
            src={users[randomNumber]?.image}
            alt="profile pic"
            className="w-16 rounded-full "
          />
        </div>
        <div className="flex justify-between  w-full ml-3">
          <div className="w-10/12 h-3 rounded self-center">
            {`${users[randomNumber]?.first_name} ${users[randomNumber]?.last_name}`}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="p-4 shadow rounded-lg text-blue-600" id="intro">
        {/* Header */}
        <div className="flex justify-between">
          <h1 className="font-bold text-xl">
            {`Random User List (${users.length})  `}
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded-full"
              onClick={() => {
                setToggle(!toggle);
              }}
            >
              refresh
            </button>
          </h1>
        </div>
        <div className="text-gray-500">Currently Function Not Available</div>
        {randomListOfUsers}
        {/* {users.map((user) => (
          <>
            <div
              className=" cursor-pointer"
              onClick={() => {
                navigate(`/profile/${user.id}`);
              }}
            >
              {user.is_admin === true && (
                <span className="flex h-3 w-3 float-right ">
                  <span className=" relative inline-flex rounded-full h-3 w-3 bg-sky-500 top-4">
                    <span className="animate-ping relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                  </span>
                </span>
              )}
              <img
                src={user.image}
                alt="profile pic"
                className="w-16 rounded-full "
              />
            </div>
            <div className="flex justify-between  w-full ml-3">
              <div className="w-10/12 h-3 rounded self-center">
                {`${user.first_name} ${user.last_name}`}
              </div>
            </div>
          </>
        ))} */}
      </div>
    </>
  );
};

export default UserList;
