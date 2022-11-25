import React from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";

function Profile() {
  const [username, setUsername] = useState("");
  /* useEffect(() => {
    const verifyUser = async () => {
      const storedToken = localStorage.getItem("authToken");
      let verifyRes = await axios.get(`http://localhost:5005/auth/verify`, {
        headers: { authorization: `Bearer ${storedToken}` },
      });
      console.log("profile page", verifyRes.data);
    };
    verifyUser();
  }, []); */
  return (
    <div className="App">
      <Navbar />
      <h1>Hello</h1>
    </div>
  );
}

export default Profile;
