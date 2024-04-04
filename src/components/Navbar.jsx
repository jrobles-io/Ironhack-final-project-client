// src/components/Navbar.jsx

import { Link } from "react-router-dom";
import { useContext } from "react"; // <== IMPORT
import { AuthContext } from "../context/auth.context"; // <== IMPORT

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext); // <== ADD

  const getToken = () => {
    return localStorage.getItem("authToken");
  };
  //  Update the rendering logic to display different content
  //  depending on whether the user is logged in or not
  return (
<nav
  className="fixed top-0 w-full z-10 bg-[#25484E] shadow-md px-5 py-3 flex justify-between items-center"
>
  <Link to="/">
    <button className="text-white hover:bg-[#54AC8E] px-3 py-1 rounded transition duration-300">Home</button>
  </Link>

  {/* UPDATE */}
  {getToken() ? (
    <>
      <Link to="/events">
        <button className="text-white hover:bg-[#54AC8E] px-3 py-1 rounded transition duration-300">Events</button>
      </Link>
      <button onClick={logOutUser} className="text-white hover:bg-[#54AC8E] px-3 py-1 rounded transition duration-300">Logout</button>
      {/* <span className="text-white">{user && user.name}</span> */}
    </>
  ) : (
    <>
      <Link to="/signup">
        <button className="text-white hover:bg-[#54AC8E] px-3 py-1 rounded transition duration-300">Sign Up</button>
      </Link>
      <Link to="/login">
        <button className="text-white hover:bg-[#54AC8E] px-3 py-1 rounded transition duration-300">Login</button>
      </Link>
    </>
  )}
</nav>

  );
}

export default Navbar;