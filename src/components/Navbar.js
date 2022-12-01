import React from "react";
import { Link } from "react-router-dom";
import HomeImage from "../assets/home.png";
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
      <img src={HomeImage} style={{ width: '300px', marginTop: 60, marginBottom: 205, }} alt="navbar-home" />
      {isLoggedIn && (
        <>
          <Link to={`/auth/profile`}>
            <button className="btn">Profile</button>
          </Link>
          <button className="btn" onClick={logOutUser}>Logout</button>
          <Link to={`/auth/main`}>
            <button className="btn">Rent a house</button>
          </Link>
          <Link to={`/auth/animal`}>
            <button className="btn">Add Pet</button>
          </Link>
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
