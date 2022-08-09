import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

import { Link, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { proj4comActions } from "../store/proj4com";

const LoginPage = () => {
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setLoginData((prevState) => ({ ...prevState, [name]: value }));
    // console.log(loginData);
  };

  const handleSubmit = async () => {
    // console.log(loginData);
    const response = await fetch("http://127.0.0.1:8000/main/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });
    const data = await response.json();
    if (response.status === 200) {
      dispatch(
        proj4comActions.storeAuthTokenAndUserInfo({
          authTokens: data,
          user: jwt_decode(data.access),
        })
      );
      localStorage.setItem("authTokens", JSON.stringify(data));
      navigate("/");
    } else {
      alert("Something went wrong!");
    }
  };

  return (
    <div className="m-12">
      <div className="container">
        <form className="bg-blue-500 text-center w-1/3 px-3 py-4 text-black mx-auto rounded">
          <input
            type="text"
            placeholder="Email"
            className="block w-full mx-auto text-sm py-2 px-3 rounded"
            name="email"
            onChange={handleChange}
            value={loginData.email}
          />
          <input
            type="password"
            placeholder="Password"
            className="block w-full mx-auto text-sm py-2 px-3 rounded my-3"
            name="password"
            onChange={handleChange}
            value={loginData.password}
          />
          <button
            type="button"
            className="bg-blue text-blue-700 font-bold py-2 px-4 rounded border block mx-auto w-full  hover:text-white"
            onClick={handleSubmit}
          >
            Login
          </button>
          <div className="bg-blue text-blue-700 font-bold py-2 px-4 block mx-auto w-full hover:text-white">
            <Link to="/register"> Don't have an Account?</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
