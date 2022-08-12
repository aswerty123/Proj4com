import { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import AuthContext from "../context/AuthContext";

const RegisterPage = () => {
  const { registerUser } = useContext(AuthContext);

  return (
    <div className="m-12">
      <div className="container">
        <form
          onSubmit={registerUser}
          className="bg-blue-500 text-center w-1/3 px-3 py-4 text-black mx-auto rounded"
        >
          <div className="text-white mb-4"> Registration Form</div>

          <input
            type="text"
            placeholder="First Name"
            className="block w-full mx-auto text-sm py-2 px-3 rounded my-3"
            name="firstName"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="block w-full mx-auto text-sm py-2 px-3 rounded my-3"
            name="lastName"
          />
          <input
            type="text"
            placeholder="Email"
            className="block w-full mx-auto text-sm py-2 px-3 rounded my-3"
            name="email"
          />
          <input
            type="password"
            placeholder="Password"
            className="block w-full mx-auto text-sm py-2 px-3 rounded my-3"
            name="password"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="block w-full mx-auto text-sm py-2 px-3 rounded my-3"
            name="confirmPassword"
          />
          <button
            type="submit"
            className="bg-blue text-blue-700 font-bold py-2 px-4 rounded border block mx-auto w-full  hover:text-white hover:bg-blue-400"
          >
            Register
          </button>
          <div className="bg-blue text-blue-700 font-bold py-2 px-4 block mx-auto w-full hover:text-white hover:underline">
            <Link to="/login"> Already have an Account?</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
