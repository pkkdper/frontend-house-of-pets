import React from "react";
import Navbar from "../components/Navbar";

function Profile() {
  return (
    <div className="App">
      <Navbar />
      <h1>Hello {name}</h1>
    </div>
  );
}

export default Profile;
