import React from "react";
import { Link } from "react-router-dom";
import HomeImage from "../assets/houselogo.png";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth.context";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  return (
    <div className="container">
      <img className="logo" src={HomeImage} alt="navbar-home" />
      <nav>
        <Link to="/">
          <button type="button" className="button">
            Home
          </button>
        </Link>

        {isLoggedIn && (
          <>
            <Link to={`/auth/profile`}>
              <button type="button" className="button">
                Profile
              </button>
            </Link>

            <Link to={`/auth/main`}>
              <button type="button" className="button">
                Rent a house
              </button>
            </Link>
            <Link to={`/auth/animal`}>
              <button type="button" className="button">
                Add Pet
              </button>
            </Link>
            <Link>
              <button type="button" className="button" onClick={logOutUser}>
                Logout
              </button>
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
    </div>
  );
}

export default Navbar;
