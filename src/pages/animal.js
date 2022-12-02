import React, { useContext } from "react";
import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/auth.context";
import {
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  GlobalStyles,
} from "@mui/material";
import { borderLeft } from "@mui/system";
import { TextInput } from "@mantine/core";

const Animal = (props) => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [size, setSize] = useState("");
  const [medical, setMedical] = useState("");
  const [passport, setPassport] = useState(false);
  const [vaccines, setVaccines] = useState(false);
  const [picture, setPicture] = useState("");
  const { getToken, updateUser } = useContext(AuthContext);

  const animalSize = [
    { size: "Small" },
    { size: "Medium" },
    { size: "Big" },
    { size: "Giant" },
  ];

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = getToken();
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/animals`,
      {
        name,
        type,
        size,
        medical,
        passport,
        vaccines,
        picture,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    // setShowanimal(event.target.value)
    updateUser();
    // const parsed = response.data;
    navigate("/auth/profile");
    // if (parsed.status === 200) {
    //   setToken(parsed.token);
    // } else {
    //   setError(parsed);
    // }
  };

  // function to update name of the animal
  const handleChange = (event) => {
    setName(event.target.value);
  };

  // function to update type of the animal
  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  // function to update size of the animal
  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  // function to update medical state of the animal
  const handleMedicalChange = (event) => {
    setMedical(event.target.value);
  };

  // function to update passport state of the animal
  const handlePassportChange = (event) => {
    setPassport(event.target.value);
  };

  // function to update vaccines state of the animal
  const handleVaccinesChange = (event) => {
    setVaccines(event.target.value);
  };

  // function to update picture state of the animal
  const handlePictureChange = async (event) => {
    event.preventDefault();
    console.log(user.payload.userCopy.animals)
    const id = user.payload.userCopy.animals._id;
    const image = event.target.imageUrl.files[0];
    const formData = new FormData();
    formData.append("imageUrl", image);
    const result = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/animal/${id}/image`,
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
    setPicture(parsed);
    updateUser();
  };
      // setPicture(event.target.value);

  return (
    <div className="animal">
      <Navbar />
      <div className="formBox">
        <div className="h4">
          <p>Create the profile of your pet:</p>
        </div>
        <form>
          <div className="select-styling">
            <label>Name: </label>
            <input type="text" value={name} onChange={handleChange}  />

            <label>Type: </label>
            <FormLabel id="demo-simple-select-label"></FormLabel>
            <select
              // labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={type}
              label="Type"
              size="small"
              onChange={handleTypeChange}
            >
              <option value={"Cat"}>Cat</option>
              <option value={"Dog"}>Dog</option>
            </select>
            <div className="select-styling">
              <label>Size: </label>
              {/* <FormLabel id="demo-simple-select-label"></FormLabel> */}
              <select
                // labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={size}
                label="Size"
                size="small"
                onChange={handleSizeChange}
              >
                <option value={"Small"}>Small</option>
                <option value={"Medium"}>Medium</option>
                <option value={"Big"}>Big</option>
                <option value={"Giant"}>Giant</option>
              </select>
            </div>

            <label>Medical:</label>
            <input type="text" value={medical} onChange={handleMedicalChange}  placeholder="Medical conditions"
      label="Medical conditions" />
            <label>Passport:</label>
            <input
              type="checkbox"
              value={passport}
              onChange={handlePassportChange}

            />
            <label>Vaccines:</label>
            <input
              type="checkbox"
              value={vaccines}
              onChange={handleVaccinesChange}

            />
            {/* <label>Picture:</label>
            <input
              id="picture"
              type="file"
              value={picture}
              onChange={handlePictureChange}
            /> */}

            {/* <input
              type="picture"
              value={picture}
              onChange={handlePictureChange}
            /> */}
            <Link to="/profile">
              <button onClick={handleSubmit} className="btn" type="submit">
                Submit
              </button>
            </Link>
          </div>
        </form>
        <form onSubmit={handlePictureChange}>
        <input
              id="picture"
              type="file"
              accept="image/png, image/jpg"
              // value={picture}
              name="imageUrl"
            />
            <button type="submit">Upload</button>
        </form>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default Animal;
