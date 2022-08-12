import React, { useState, useEffect, useContext } from "react";
import jwt_decode from "jwt-decode";

import { Link, useNavigate } from "react-router-dom";

import AuthContext from "../context/AuthContext";

const LoginPage = () => {
  const { loginUser } = useContext(AuthContext);

  return (
    <div className="m-12">
      <div className="container">
        <form
          onSubmit={loginUser}
          className="bg-blue-500 text-center w-1/3 px-3 py-4 text-black mx-auto rounded"
        >
          <div className="text-white mb-4"> Login Form</div>
          <input
            type="text"
            placeholder="Email"
            className="block w-full mx-auto text-sm py-2 px-3 rounded"
            name="email"
            // onChange={handleChange}
            // value={loginData.email}
          />
          <input
            type="password"
            placeholder="Password"
            className="block w-full mx-auto text-sm py-2 px-3 rounded my-3"
            name="password"
            // onChange={handleChange}
            // value={loginData.password}
          />
          <button
            type="submit"
            className="bg-blue text-blue-700 font-bold py-2 px-4 rounded border block mx-auto w-full  hover:text-white hover:bg-blue-400"
            // onClick={handleSubmit}
          >
            Login
          </button>
          <div className="bg-blue text-blue-700 font-bold py-2 px-4 block mx-auto w-full hover:text-white  hover:underline">
            <Link to="/register"> Don't have an Account?</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
