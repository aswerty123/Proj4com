import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );
  const [loading, setLoading] = useState(true);
  const [toggle, setToggle] = useState(true);

  const [postInfo, setPostInfo] = useState(null);

  const navigate = useNavigate();

  const loginUser = async (e) => {
    // console.log(e.target.email.value);
    // console.log(e.target.password.value);
    e.preventDefault();
    const response = await fetch("http://127.0.0.1:8000/main/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    });
    const data = await response.json();
    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      navigate("/");
    } else {
      alert("Oops, Something went Wrong!");
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/login");
  };

  const registerUser = async (e) => {
    e.preventDefault();
    const response = await fetch("http://127.0.0.1:8000/main/account-create/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: e.target.firstName.value,
        last_name: e.target.lastName.value,
        email: e.target.email.value,
        password:
          e.target.password.value === e.target.confirmPassword.value
            ? e.target.password.value
            : null,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (e.target.password.value !== e.target.confirmPassword.value) {
      console.log(data);
      alert("Oops, Password does NOT match!");
    } else if (data === "empty field") {
      alert("Please Complete the form!");
    } else if (data === "User created") {
      alert("User Registered Successfully!");
      navigate("/login");
    } else {
      alert("Oops, Something went Wrong!");
    }
  };

  const updateToken = async () => {
    console.log("Update token called!");
    const response = await fetch("http://127.0.0.1:8000/main/token/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: authTokens?.refresh }),
    });
    const data = await response.json();
    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      navigate("/");
    } else {
      logoutUser();
    }
    if (loading) {
      setLoading(false);
    }
  };

  const contextData = {
    user,
    authTokens,

    postInfo,
    toggle,
    setPostInfo,
    setToggle,

    loginUser,
    logoutUser,
    registerUser,
  };

  useEffect(() => {
    if (loading) {
      updateToken();
    }
    const fiftyMins = 1000 * 60 * 50;
    const interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, fiftyMins);
    return () => clearInterval(interval);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
