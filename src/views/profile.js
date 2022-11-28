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
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [surname, setSurname] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

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
  const setData = (data) => {
    console.log(data);
  };
  if (!profileUser) {
    return <p>Loading</p>;
  }


  function onSubmit() {
    console.log("ok")
  }

  return (
    <div className="App">
      <Navbar />
      <h1>Hello {profileUser.username}</h1>

      <form onSubmit={onSubmit}>
        <label>
          Email:
          <input type="email" value={profileUser.email} onChange={(e) => setEmail(e.target.value)}name="email" />
        </label>
        <label>
          Username:
          <input type="text" value={profileUser.username} onChange={(e) => setUsername(e.target.value)} name="username"/>
        </label>
        {/* <label>
          Password:
          <input type="password" value={profileUser.password} />
        </label> */}
        <label>
          Name:
          <input
            type="text" placeholder="add your name" name="name"
          />
        </label>
        <label>
          Surname:
          <input type="text" placeholder="add your surname" name="surname"/>
        </label>
        <label>
          Location:
          <input type="text" placeholder="pick location on the map" name="lovation"/>
        </label>
        <label>
          Age:
          <input type="number" placeholder="add age" name="age"/>
        </label>
        <label>
          Picture:
          <input type="text" placeholder="upload img" name="picture"/>
        </label>
        <label>
          Animals:
          <input
            type="text"
            placeholder="add animals to your profile in animals page"
          />
          <Link to="/auth/animal">
            <button>Add animal</button>
          </Link>
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
