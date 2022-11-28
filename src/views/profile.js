import React from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Link, useParams , useNavigate} from "react-router-dom";
import {AuthContext} from "../contexts/auth.context"
function Profile(props) {const navigate = useNavigate();
  const [profileUser, setProfileUser] = useState(null)
    const {user} = useContext(AuthContext)
    useEffect(()=> {
    if (user) {
    const getUsers = () => {
    const id = user.payload.userCopy._id
    axios
      .get(`http://localhost:5005/auth/profile/${id}`)
      .then((response) => {
        console.log("Response from API is: ", response.data);
        setProfileUser(response.data)
      })
      
      .catch((err) => console.log(err));
  };
  getUsers()
}
    },[user])
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

  const setData = (data) => {
    console.log(data);
};
if(!profileUser) {
return <p>Loading</p>}

  return (
    <div className="App">
      <Navbar />
      <h1>Hello {profileUser.username}</h1>

      <form
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
          <input type="text" placeholder="add your name" value={profileUser.name}/>
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
                  <Link to="/auth/animal"><button>Add animal</button></Link>

        </label>
        <label>
          Houses:
          <input type="text" placeholder="to see any houses rent them" />
        </label>
        <button onClick={(data) => setData()}>Update</button>
      </form>
    </div>
  );
}

export default Profile;
