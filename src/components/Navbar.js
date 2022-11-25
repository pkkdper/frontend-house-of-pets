import React from "react";
import { Link } from "react-router-dom";
import HomeImage from "../assets/home.png";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth.context";

function Navbar() {
  const { isLoggedIn, user } = useContext(AuthContext);
  return (
    <nav>
      <u>
        <Link to="/">Home</Link>
        <img src={HomeImage} alt="navbar-home" />
        {isLoggedIn && (
          <>
            <Link to="/auth/profile"> Profile</Link>
            <button>Logout</button>
          </>
        )}
        {!isLoggedIn && (
          <>
            <Link to="/auth/signup"> Sign Up </Link>
            <Link to="/auth/login"> Login </Link>
          </>
        )}
      </u>
    </nav>
  );
}

export default Navbar;
