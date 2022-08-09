import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { proj4comActions } from "../store/proj4com";

const NavBar = () => {
  const dispatch = useDispatch();
  const storeUser = useSelector((state) => state.proj4com.user);

  const navigate = useNavigate();

  const logoutUser = () => {
    dispatch(
      proj4comActions.storeAuthTokenAndUserInfo({
        authTokens: null,
        user: null,
      })
    );
    localStorage.removeItem("authTokens");
    navigate("/login");
  };

  return (
    <div className="bg-blue-500 h-14 flex items-center text-white">
      <span className="text-3xl mx-12"> Proj4com </span>{" "}
      <Link to="/">Home</Link>
      <span> | </span>
      {storeUser ? (
        <p onClick={logoutUser}>Logout</p>
      ) : (
        <Link to="/login">Login</Link>
      )}
      {storeUser && (
        <p>Hello {`${storeUser.first_name} ${storeUser.last_name}`} </p>
      )}
    </div>
  );
};

export default NavBar;
