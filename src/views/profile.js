import React from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/auth.context";

function Profile(props) {
  const navigate = useNavigate();
  const [profileUser, setProfileUser] = useState(null);
  const { user, updateUser, isLoggedIn, logOutUser } = useContext(AuthContext);
  const [changedUsername, setChangedUsername] = useState("");
  const [changedEmail, setChangedEmail] = useState("");
  const [changedSurname, setChangedSurname] = useState("");
  const [changedName, setChangedName] = useState("");
  const [changedAge, setChangedAge] = useState("");
  const [changedPicture, setChangedPicture] = useState("");
  const [changedLocation, setChangedLocation] = useState("");
  const [file, setFile] = useState(null);
  const [showanimal, setShowanimal] = useState(null);

  // useEffect(() => {
  //   if (user) {
  //     const getUsers = () => {
  //       const id = user.payload.userCopy._id;
  //       axios
  //         .get(`http://localhost:5005/auth/profile/${id}`)
  //         .then((response) => {
  //           setProfileUser(response.data);
  //         })

  //         .catch((err) => console.log(err));
  //     };
  //     getUsers();
  //   }
  // }, []);
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

  function handleChange(event) {
    setFile(event.target.files[0]);
  }
  useEffect(() => {
    if (user) {
      setChangedUsername(user.payload.userCopy.username);
      setChangedEmail(user.payload.userCopy.email);
      setChangedSurname(user.payload.userCopy.surname);
      setChangedName(user.payload.userCopy.name);
      setChangedAge(user.payload.userCopy.age);
      setChangedPicture(user.payload.userCopy.picture);
      setChangedLocation(user.payload.userCopy.location);
    }
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const id = user.payload.userCopy._id;
    // const userInfo = user.payload.userCopy;

    const result = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/auth/profile/${id}`,
      {
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
          picture: changedPicture,
        }),
      }
    );
    const parsed = result.json();
    updateUser();
    // navigate("/")
  };
  if (!user) {
    return <p>Loading</p>;
  }
  console.log("the user", user.payload.userCopy);

  return (
    <div className="App">
      <Navbar />
      <h1>Hello {user.payload.userCopy.username}</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="text"
            onChange={(e) => setChangedEmail(e.target.value)}
            name="email"
            value={changedEmail}
          />
        </label>
        <label>
          Username:
          <input
            type="text"
            onChange={(e) => setChangedUsername(e.target.value)}
            name="username"
            value={changedUsername}
          />
        </label>
        <label>
          Name:
          <input
            type="text"
            placeholder="add your name"
            name="name"
            onChange={(e) => setChangedName(e.target.value)}
            value={changedName}
          />
        </label>
        <label>
          Surname:
          <input
            type="text"
            placeholder="add your surname"
            name="surname"
            onChange={(e) => setChangedSurname(e.target.value)}
            value={changedSurname}
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            placeholder="add your location"
            name="location"
            onChange={(e) => setChangedLocation(e.target.value)}
            value={changedLocation}
          />
        </label>
        <label>
          Age:
          <input
            type="number"
            placeholder="add age"
            name="age"
            onChange={(e) => setChangedAge(e.target.value)}
            value={changedAge}
          />
        </label>
        <button>
          <label htmlFor="img">
            Choose a Picture:
            <input
              type="file"
              style={{ display: "none" }}
              id="img"
              placeholder="add image"
              name="picture"
              onChange={(e) => setChangedPicture(e.target.value)}
            />
          </label>
        </button>
        <label>
          Animals:
          <li></li>
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
