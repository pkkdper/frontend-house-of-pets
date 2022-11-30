import React from "react";
import { Link } from "react-router-dom";
import HomeImage from "../assets/home.png";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth.context";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  return (
    <nav>
      <Link to="/">
        <button>Home</button>
      </Link>
      <img src={HomeImage} alt="navbar-home" />
      {isLoggedIn && (
        <>
          <Link to={`/auth/profile`}>
            <button>Profile</button>
          </Link>
          <button onClick={logOutUser}>Logout</button>
          <Link to={`/auth/main`}>
            <button>Rent a house</button>
          </Link>
          <Link to={`/auth/animal`}>
            <button>Add Pet</button>
          </Link>
        </>
      )}
      {!isLoggedIn && (
        <>
          <Link to="/auth/signup">
            <button>Sign Up </button>
          </Link>
          <Link to="/auth/login">
            <button>Login</button>
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
