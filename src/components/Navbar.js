import React from "react";
import { Link } from "react-router-dom";
import HomeImage from "../assets/home.png";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth.context";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth.context";

function Navbar() {
  const { isLoggedIn, user, removeToken } = useContext(AuthContext);
  return (
    <nav>
      <Link to="/">
        <button>Home</button>
      </Link>
      <img src={HomeImage} alt="navbar-home" />
      {isLoggedIn && (
        <>
          <Link to="/auth/profile">
            <button>Profile</button>
          </Link>
          <Link to="/auth/animal">
            <button>Add animal</button>
          </Link>

          <button onClick={() => removeToken()}>Logout</button>
        </>
      )}
      {!isLoggedIn && (
        <>
          <Link to="/auth/signup"> Sign Up </Link>
          <Link to="/auth/login"> Login </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
