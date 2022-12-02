import React from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/auth.context";
import Footer from "../components/Footer";

function Profile(props) {
  const navigate = useNavigate();
  const { user, updateUser, isLoading, setUser } = useContext(AuthContext);
  const [changedUsername, setChangedUsername] = useState("");
  const [changedEmail, setChangedEmail] = useState("");
  const [changedSurname, setChangedSurname] = useState("");
  const [changedName, setChangedName] = useState("");
  const [changedAge, setChangedAge] = useState(0);
  const [changedPicture, setChangedPicture] = useState("");
  const [changedLocation, setChangedLocation] = useState("");
  const [file, setFile] = useState(null);

  function handleChange(event) {
    setFile(event.target.files[0]);
  }
  useEffect(() => {
    if (!isLoading) {
      setChangedUsername(user.payload.userCopy.username);
      setChangedEmail(user.payload.userCopy.email);
      setChangedSurname(user.payload.userCopy.surname);
      setChangedName(user.payload.userCopy.name);
      setChangedAge(user.payload.userCopy.age);
      setChangedPicture(user.payload.userCopy.picture);
      setChangedLocation(user.payload.userCopy.location);
    }
  }, [isLoading, user]);

  const handleSubmitPicture = async (event) => {
    event.preventDefault();
    const id = user.payload.userCopy._id;
    // const userInfo = user.payload.userCopy;
    const image = event.target.imageUrl.files[0];
    const formData = new FormData();
    formData.append("imageUrl", image);
    formData.append("name", changedName);
    formData.append("email", changedEmail);
    formData.append("username", changedUsername);
    formData.append("location", changedLocation);
    formData.append("age", changedAge);
    formData.append("surname", changedSurname);
    const result = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/auth/profile/update/${id}/image`,
      {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        body: formData,
      }
    );
    const parsed = await result.json();
    console.log(parsed);
    setUser(parsed);
    updateUser();
  };
  const handleSubmitUser = async (event) => {
    event.preventDefault();
    const id = user.payload.userCopy._id;
    // const userInfo = user.payload.userCopy;
    // const image = event.target.imageUrl.files[0];
    const formData = new FormData();
    // formData.append("imageUrl", image);
    // formData.append("name", changedName);
    // formData.append("email", changedEmail);
    // formData.append("username", changedUsername);
    // formData.append("location", changedLocation);
    // formData.append("age", changedAge);
    // formData.append("surname", changedSurname);
    const result = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/auth/profile/update/${id}`,
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
        }),
      }
    );
    const parsed = await result.json();
    console.log(parsed);
    setUser(parsed);
    updateUser();
  };

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
  };
  const handleDeleteAnimal = async (animalid) => {
    const id = user.payload.userCopy._id;
    await axios.delete(
      `http://localhost:5005/animals/animal/${animalid}/delete/${id}`
    );
    updateUser();

    // router.get('/movie-characters/delete/:id', (req, res) => {
    //   const animalId = req.params.id;

    //   apiService
    //     .deleteCharacter(animalId)
    //     .then((response) => {
    //        res.json(response.data);
    //       // res.redirect(`/movie-characters/list`); // <== leave this line commented for now
    //     })
    //     .catch(error => console.log(error));
    // });
  };
  if (!user) {
    return <p>Loading</p>;
  }
  // console.log("the user", user);
  return (
    <div className="App">
      <Navbar />
      <div className="formBox">
        <div className="h4">
          <p>
            Hello{" "}
            {user.payload.userCopy.username[0].toUpperCase() +
              user.payload.userCopy.username.substring(1)}
            !
          </p>
        </div>

        <form onSubmit={handleSubmitUser} encType="multipart/form-data">
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
          {/* <label> */}
          Animals:
          {user &&
            user.payload.userCopy.animals.map((animal) => {
              return (
                <div key={animal._id}>
                  <ul>
                    <li>Name: {animal.name}</li>
                    <li>Type: {animal.type}</li>
                    <li>Size: {animal.size}</li>
                    {animal.passport == true ? (
                      <li>Has Passport</li>
                    ) : (
                      <li>Doesn't have passport</li>
                    )}
                    {animal.vaccines == true ? (
                      <li>Vaccinated</li>
                    ) : (
                      <li>Not Vaccinated</li>
                    )}
                    {animal.photo ? (
                      <img src={animal.picture} />
                    ) : (
                      <li>No photo</li>
                    )}
                  </ul>
                  <button
                    type="button"
                    onClick={() => {
                      handleDeleteAnimal(animal._id);
                    }}
                  >
                    Delete Animal
                  </button>
                </div>
              );
            })}
          <Link to="/auth/animal">
            <button className="btn" type="button">
              Add animal
            </button>
          </Link>
          <label>
            Houses:
            {user &&
              user.payload.userCopy.houses.map((house) => {
                return (
                  <ul key={house._id}>
                    <li key={house._id}>{house.name}</li>
                  </ul>
                );
              })}
          </label>
          <button onClick={handleSubmit} className="btn" type="submit">
            Update
          </button>
        </form>
        <form onSubmit={handleSubmitPicture}>
          <label htmlFor="img">
            Choose a Picture:
            <input
              name="imageUrl"
              accept="image/png, image/jpg"
              type="file"
              // style={{ display: "none" }}
              id="img"
              placeholder="add image"
            />
          </label>
          <button type="submit">Upload</button>
        </form>
        <img src={user.payload.userCopy.picture} className="imageProfile" />

        {/* {user.payload.userCopy.picture !== "undefined" ? (
                       <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.lewesac.co.uk%2Fabout-us%2Fcoaches-leaders%2Fattachment%2Fdefault-avatar&psig=AOvVaw22ZPLu-sMO2wHMzmtnOmPB&ust=1670018374900000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCKCDy7G12fsCFQAAAAAdAAAAABAE" className="imageProfile" />
                    ) : (
                      <img src={user.payload.userCopy.picture} className="imageProfile" />
                      )} */}
        {/* onerror="if (this.src != 'error.jpg') this.src = 'error.jpg';" */}


      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default Profile;
