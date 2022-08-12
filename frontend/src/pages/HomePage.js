import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ListOfPost from "../components/HomePage/ListOfPost";
import InputPost from "../components/HomePage/InputPost";

import jwt_decode from "jwt-decode";

import { useSelector, useDispatch } from "react-redux";
import { proj4comActions } from "../store/proj4com";
import FriendList from "../components/HomePage/FriendList";
import UserList from "../components/HomePage/UserList";

const HomePage = () => {
  return (
    <div>
      <div className="grid grid-cols-4  gap-6 mt-4 w-full">
        <div className="relative p-4 w-full bg-white rounded-lg overflow-hidden shadow hover:shadow-md ">
          <div className="animate-pulse flex flex-col">
            <div className="rounded w-full h-52 bg-gray-200"></div>
            <div className="flex flex-col mt-5">
              <div className="w-full h-5 bg-gray-200 rounded"></div>
              <div className="mt-2 w-10/12 h-3 bg-gray-200 rounded"></div>
              <div className="mt-2 w-8/12 h-3 bg-gray-200 rounded"></div>
            </div>

            <div className="grid grid-cols-2 mt-5 gap-x-2 gap-y-1">
              <div className="mt-2 w-full h-3 bg-gray-200 rounded"></div>
              <div className="mt-2 w-full h-3 bg-gray-200 rounded"></div>
              <div className="mt-2 w-full h-3 bg-gray-200 rounded"></div>
              <div className="mt-2 w-full h-3 bg-gray-200 rounded"></div>
            </div>

            <div className="flex items-center mt-5">
              <div>
                <div className="rounded-full bg-gray-200 w-10 h-10"></div>
              </div>
              <div className="flex justify-between w-full ml-3">
                <div className="w-5/12 h-3 bg-gray-200 rounded"></div>
                <div className="w-2/12 h-3 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <InputPost />
          <ListOfPost />
        </div>

        <div className="relative p-2 w-full bg-white rounded-lg overflow-hidden shadow hover:shadow-md">
          <FriendList />
          <UserList />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
