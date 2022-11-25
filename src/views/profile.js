import React from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Profile(props) {

  const getUsers = id => {
    axios
      .get(`http://localhost:5005/auth/profile${id}`)
      .then(response => {
        console.log('Response from API is: ', response);
        const users = response.data[0];
        console.log('a single country details: ', users);
      })
      .catch(err => console.log(err));
  };




  const { userId } = useParams();
 /*  console.log('userId', userId); */
  // const [userPage, setUserPage] = useState([]);

/*   const foundUser = getUsers.find((oneUser) => {   //  <== ADD
    return oneUser._id === userId;
  }); */


  
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


 {/*      {foundUser && (
        <>
          <h2>{foundUser.name}</h2>
        </>
      )} */}



      <form
      // onSubmit={this.handleSubmit}
      >
        <label>
          Email:
          <input type="email" />
        </label>
        <label>
          Username:
          <input type="text" />
        </label>
        <label>
          Password:
          <input type="text" />
        </label>
        <label>
          Name:
          <input type="text" placeholder="add your name" />
        </label>
        <label>
          Surname:
          <input type="text" placeholder="add your surname" />
        </label>
        <label>
          Location:
          <input type="text" placeholder="pick location on the map" />
        </label>
        <label>
          Age:
          <input type="number" placeholder="add age" />
        </label>
        <label>
          Picture:
          <input type="text" placeholder="upload img" />
        </label>
        <label>
          Animals:
          <input
            type="text"
            placeholder="add animals to your profile in animals page"
          />
        </label>
        <label>
          Houses:
          <input type="text" placeholder="to see any houses rent them" />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default Profile;
