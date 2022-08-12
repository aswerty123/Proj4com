import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

const FriendList = () => {
  return (
    <>
      <div className="p-4 shadow rounded-lg text-blue-600" id="intro">
        {/* Header */}
        <div className="flex justify-between">
          <h1 className="font-bold text-xl">Friends List</h1>
        </div>
        <div className="text-gray-500">Currently Function Not Available</div>
        {/* List */}
      </div>
    </>
  );
};

export default FriendList;
