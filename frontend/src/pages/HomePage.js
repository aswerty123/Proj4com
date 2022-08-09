import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ListOfPost from "../components/HomePage/ListOfPost";
import InputPost from "../components/HomePage/InputPost";

import { useSelector, useDispatch } from "react-redux";
import { proj4comActions } from "../store/proj4com";

const HomePage = () => {
  return (
    <div>
      <InputPost />
      <p>You are logged in the home page!</p>

      <ListOfPost />
    </div>
  );
};

export default HomePage;
