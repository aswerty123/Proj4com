import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

import AuthContext from "../context/AuthContext";

const ProfilePage = () => {
  const [profileInfo, setProfileInfo] = useState(null);
  const { authTokens, logoutUser, user, setToggle, toggle, setPostInfo } =
    useContext(AuthContext);

  const { id } = useParams();

  useEffect(() => {
    getProfileData();
    // console.log("useEffect called");
    // // console.log(user);
  }, []);

  const getProfileData = async () => {
    const response = await fetch(
      `http://127.0.0.1:8000/main/account-detail/${id}/`,
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
      setProfileInfo(data);
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    }
  };
  return (
    <>
      <div className="holder">
        <div className="card border w-full hover:shadow-none relative flex flex-col mx-auto shadow-lg ">
          <div className="h-20 w-full opacity-80 absolute top-0 bg-cyan-600" />
          <div className="profile w-full flex items-center m-3 ml-4 text-white z-1">
            <img
              className="w-32 h-32 p-1 rounded bg-white z-10"
              src={profileInfo?.image}
              alt=""
            />
            {profileInfo?.is_admin === true && (
              <span className="flex h-3 w-3 float-right z-10">
                <span className=" relative inline-flex rounded-full h-3 w-3 bg-sky-500 bottom-12 right-4">
                  <span className="animate-ping relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                </span>
              </span>
            )}
            <div className="relative text-3xl ml-4 bottom-4 ">{`${profileInfo?.first_name} ${profileInfo?.last_name}`}</div>
            <div className="title mt-11 ml-3 font-bold flex flex-col"></div>
          </div>
          <div className="buttons flex absolute bottom-0 font-bold right-0 text-xs text-gray-500 space-x-0 my-3.5 mr-3">
            <div className="add border rounded-l-2xl rounded-r-sm border-gray-300 p-1 px-4 cursor-pointer hover:bg-blue-600 hover:text-white">
              Add Contact
            </div>
            <div className="add border rounded-r-2xl rounded-l-sm border-gray-300 p-1 px-4 cursor-pointer hover:bg-blue-600 hover:text-white">
              Edit Profile
            </div>
          </div>
        </div>
      </div>
      <div>{JSON.stringify(profileInfo)}</div>
    </>
  );
};

export default ProfilePage;
