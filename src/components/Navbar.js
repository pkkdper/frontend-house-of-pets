import React from "react";
import { Link } from "react-router-dom";
import HomeImage from "../assets/houselogo.png";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth.context";
import { Center } from "@mantine/core";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  return (
    <nav>
      <Link to="/">
        <button className="btn">Home</button>
      </Link>
      <div className="logo">
        <img src={HomeImage} alt="navbar-home" />
      </div>
      {isLoggedIn && (
        <>
          <Link to={`/auth/profile`}>
            <button className="btn">Profile</button>
          </Link>

          <Link to={`/auth/main`}>
            <button className="btn">Rent a house</button>
          </Link>
          <Link to={`/auth/animal`}>
            <button className="btn">Add Pet</button>
          </Link>
          <img src={user.payload.userCopy.picture} className="imageProfileNav"/>
          <p>{user.payload.userCopy.username}</p>
          <button className="btn" onClick={logOutUser}>
            Logout
          </button>
        </>
      )}
      {!isLoggedIn && (
        <>
          <Link to="/auth/signup">
            <button className="btn">Sign Up </button>
          </Link>
          <Link to="/auth/login">
            <button className="btn">Login</button>
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
