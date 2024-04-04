// src/pages/LoginPage.jsx

import { useState, useContext } from "react";

import { AuthContext } from "../context/auth.context";

import { Link, useNavigate } from "react-router-dom";

import { post } from "../services/authService";

function LoginPage() {
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");

  const [thisUser, setThisUser] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState(undefined);

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  //   const handleEmail = (e) => setEmail(e.target.value);
  //   const handlePassword = (e) => setPassword(e.target.value);

  const handleTextChange = (e) => {
    setThisUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    post("/auth/login", thisUser)
      .then((response) => {
        console.log("Login response ===>", response.data);
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center h-full p-10 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-8">Login</h1>

      <form className="w-full max-w-xs space-y-4" onSubmit={handleLoginSubmit}>
        <div>
          <label className="block text-gray-300 text-sm font-bold mb-2">
            Email:
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-600 rounded shadow appearance-none text-gray-300 bg-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            name="email"
            value={thisUser.email}
            onChange={handleTextChange}
          />
        </div>

        <div>
          <label className="block text-gray-300 text-sm font-bold mb-2">
            Password:
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-600 rounded shadow appearance-none text-gray-300 bg-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            name="password"
            value={thisUser.password}
            onChange={handleTextChange}
          />
        </div>

        <button
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Login
        </button>
      </form>

      {errorMessage && <p className="text-red-400 mt-4">{errorMessage}</p>}

      <p className="mt-6 text-gray-300">Don't have an account yet?</p>
      <Link to={"/signup"} className="text-blue-400 hover:text-blue-600">
        Sign Up
      </Link>
    </div>
  );
}

export default LoginPage;
