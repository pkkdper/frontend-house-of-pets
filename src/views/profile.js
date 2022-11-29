import React from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/auth.context";

function Profile(props) {
  const navigate = useNavigate();
  const [profileUser, setProfileUser] = useState(null);
  const { user } = useContext(AuthContext);  
  const [changedUsername, setChangedUsername] = useState("");
  const [changedEmail, setChangedEmail] = useState("");
  const [changedSurname, setChangedSurname] = useState("");
  const [changedName, setChangedName] = useState("");
  const [changedAge, setChangedAge] = useState("");
  const [changedLocation, setChangedLocation] = useState("");
  const [changedPicture, setChangedPicture] = useState("");

  useEffect(() => {
    if (user) {
      const getUsers = () => {
        const id = user.payload.userCopy._id;
        axios
          .get(`http://localhost:5005/auth/profile/${id}`)
          .then((response) => {
            setProfileUser(response.data);
          })

          .catch((err) => console.log(err));
      };
      getUsers();
    }
  }, [user]);
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
  // const setData = (data) => {
  //   console.log(data);
  // };
  if (!profileUser) {
    return <p>Loading</p>;
  }


  const handleSubmit = async (event) => {
      event.preventDefault();
      const id = user.payload.userCopy._id;
      // const userInfo = user.payload.userCopy;

      const result = await fetch(`http://localhost:5005/auth/profile/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: changedName,
          email: changedEmail,
          username: changedUsername,
          location: changedLocation,
          age: changedAge,
          surname: changedSurname,
          picture: changedPicture
        }),
      });
    const parsed = result.json()
    // navigate("/")
  };
  

  return (
    <div className="App">
      <Navbar />
      <h1>Hello {profileUser.username}</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="text" defaultValue={profileUser.email} onChange={(e) => setChangedEmail(e.target.value)}name="email" />
        </label>
        <label>
          Username:
          <input type="text" defaultValue={profileUser.username} onChange={(e) => setChangedUsername(e.target.value)} name="username"/>
        </label>
        <label>
          Name:
          <input type="text" placeholder="add your name" name="name" onChange={(e) => setChangedName(e.target.value)} defaultValue={profileUser.name}/>
        </label>
        <label>
          Surname:
          <input type="text" placeholder="add your surname" name="surname" onChange={(e) => setChangedSurname(e.target.value)} defaultValue={profileUser.surname}/>
        </label>
        <label>
          Location:
          <input type="text" placeholder="add your location" name="location" onChange={(e) => setChangedLocation(e.target.value)} defaultValue={profileUser.location}/>
        </label>
        <label>
          Age:
          <input type="number" placeholder="add age" name="age" onChange={(e) => setChangedAge(e.target.value)} defaultValue={profileUser.age}/>
        </label>
        <button><label for="img">
          Upload Picture:
          <input type="file" style={{display:"none"}} id="img" placeholder="add image" name="picture" onChange={(e) => setChangedPicture(e.target.value)}/>
        </label></button>
        <label>
          Animals:
          <li></li>

{/*           
          .map((item) => (
            <li key={item.name}>{item.name}
            {/* <img src={img}/> */}
            {/* </li> */} 


          <Link to="/auth/animal">
            <button>Add animal</button>
          </Link>
        </label>
        <label>
          Houses:
          <li></li>
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
      }

export default Profile;
