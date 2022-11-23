import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <Link to="/login">
        <h1>Log in</h1>
      </Link>
      <Link to="/signup">
        {" "}
        <h1>Sign up</h1>
      </Link>
      <Link to="/profile">
        <h1>Profile</h1>
      </Link>
    </div>
  );
}

export default Home;
