import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const NavBar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  return (
    <div className="bg-blue-500 h-14 flex items-center text-white justify-between">
      <div className="flex items-center justify-self-end">
        <span className="text-4xl mx-12"> Proj4com </span>{" "}
        {user && (
          <p className="text-2xl mx-5">
            Welcome {`${user.first_name} ${user.last_name}`} !
          </p>
        )}
      </div>
      <div className="flex items-center justify-self-end mr-24 text-bold text-xl">
        <div>
          <Link
            className="inline-block px-6 py-2.5 hover:bg-blue-300 text-white font-medium text-xl leading-tight  hover:shadow-inner-lg hover:text-indigo-900"
            to={`/profile/${user?.user_id}`}
          >
            Profile
          </Link>
        </div>
        <div> | </div>
        <div>
          <Link
            className="inline-block px-6 py-2.5 hover:bg-blue-300 text-white font-medium text-xl leading-tight  hover:shadow-inner-lg hover:text-indigo-900"
            to="/"
          >
            Home
          </Link>
        </div>
        <div> | </div>
        <div>
          {user ? (
            <div className=" hover:text-indigo-900" onClick={logoutUser}>
              <button
                type="button"
                class="inline-block px-6 py-2.5 hover:bg-red-400 rounded-full text-white font-medium text-xl leading-tight  hover:shadow-inner-lg hover:text-indigo-900"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              className=" inline-block px-6 py-2.5 hover:bg-emerald-500 rounded-full text-white font-medium text-xl leading-tight  hover:shadow-inner-lg hover:text-indigo-900"
              to="/login"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
