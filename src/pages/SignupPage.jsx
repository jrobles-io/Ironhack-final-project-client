// src/pages/SignupPage.jsx

import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../services/authService";

function SignupPage() {
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");
  //   const [name, setName] = useState("");

  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    name: "",
  });

  const [errorMessage, setErrorMessage] = useState(undefined);

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  //   const handleEmail = (e) => setEmail(e.target.value);
  //   const handlePassword = (e) => setPassword(e.target.value);
  //   const handleName = (e) => setName(e.target.value);

  const handleTextChange = (e) => {
    setNewUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    post("/auth/signup", newUser)
      .then((response) => {
        console.log("This is the new user ===>", response.data);
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(err.response.data.message);
        setNewUser({
          email: "",
          password: "",
          name: "",
        });
      });
  };

  return (
    <div className="flex flex-col justify-center items-center h-full p-10 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-8">Sign Up</h1>

      <form className="w-full max-w-xs space-y-4" onSubmit={handleSignupSubmit}>
        <div>
          <label className="block text-gray-300 text-sm font-bold mb-2">
            Email:
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-600 rounded shadow appearance-none text-gray-300 bg-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            name="email"
            value={newUser.email}
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
            value={newUser.password}
            onChange={handleTextChange}
          />
        </div>

        <div>
          <label className="block text-gray-300 text-sm font-bold mb-2">
            Username:
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-600 rounded shadow appearance-none text-gray-300 bg-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="name"
            value={newUser.name}
            onChange={handleTextChange}
          />
        </div>

        <button
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Sign Up
        </button>
      </form>

      {errorMessage && <p className="text-red-400 mt-4">{errorMessage}</p>}

      <p className="mt-6 text-gray-300">Already have an account?</p>
      <Link to={"/login"} className="text-blue-400 hover:text-blue-600">
        Login
      </Link>
    </div>
  );
}

export default SignupPage;
