import React from "react";
import { Link } from "react-router-dom";
import HomeImage from "../assets/houselogo.png";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth.context";
import { Center } from "@mantine/core";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/"><img src={HomeImage} alt="navbar-home" /></Link>
      </div>

      <nav>
        <Link to="/">
          <button className="btn">Home</button>
        </Link>

        {isLoggedIn && (
          <>
            <div className="leftSideNav">
              <Link to={`/auth/profile`}>
                <button className="btn">Profile</button>
              </Link>

              <Link to={`/auth/main`}>
                <button className="btn">Rent a house</button>
              </Link>
              <Link to={`/auth/animal`}>
                <button className="btn">Add Pet</button>
              </Link>
            </div>
            <div className="rightSideNav"><button className="btn" onClick={logOutUser}>
                Logout
              </button>
              <p>{user.payload.userCopy.username}</p> 
               <img
                src={user.payload.userCopy.picture}
                className="imageProfileNav"
              />
            </div>
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
    </div>
  );
}

export default Navbar;
