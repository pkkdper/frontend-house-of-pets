import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/auth.context";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export default function App() {
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState(allData);
  const [search, setSearch] = useState(``);

  const handleSearch = (e) => {};
  const { user, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchHouses = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/house/houses`)
      .then((response) => {
        //console.log(response.data); // get all the houses from the DB
        setAllData(response.data); // this is the way to change the value of allData
        setFilteredData(response.data);
      })
      .catch((error) => {
        console.log("Error getting fake data: " + error);
      });
  };
  useEffect(() => {
    fetchHouses();
  }, []);
  console.log("All data", allData);

  const handleAddHouse = async (id) => {
    await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/house/houses/renthouse/${id}/user/${user.payload.userCopy._id}`
    );
    updateUser();
  };

  return (
    <div className="App">
      <div>
        <Navbar />
        <label>Search:</label>
        <input
          type="text"
          onChange={(event) => setSearch(event.target.value)}
        />
        <div className="houses">
          {allData
            .filter((item) => {
              if (item.name.toLowerCase().includes(search.toLowerCase())) {
                return item;
              }
              if (item.location.toLowerCase().includes(search.toLowerCase())) {
                return item;
              }
              if (item.pricepernight === search) {
                return item;
              }
              if (item.maxnumberofdays === search) {
                return item;
              }
              if (item.rooms === search) {
                return item;
              }
              if (item.type === search) {
                return item;
              }
              if (item.animaltype === search) {
                return item;
              }
              if (item.maxsizeofanimal === search) {
                return item;
              }
              if (item.maxnumberofanimals === search) {
                return item;
              }
              if (item.photo === search) {
                return item;
              }
            })
            .map((item, index) => (
              <ul key={item._id} className="house">
                <li className="name">{item.name}</li>
                <li>
                  <div className="housephoto">
                    <img src={item.photo} alt="photo" />
                  </div>
                </li>
                <li>Location: {item.location}</li>
                <li>Price per night: {item.pricepernight}</li>
                <li>Max numbers of days: {item.maxnumberofdays}</li>
                <li>Rooms: {item.rooms}</li>
                <li>Type: {item.type}</li>
                <li>Animal Type: {item.animaltype}</li>
                <li>Max size of animal: {item.maxsizeofanimal}</li>
                <li>Max of number of animals: {item.maxnumberofanimals}</li>

                <button
                  className="btn"
                  onClick={() => {
                    handleAddHouse(item._id);
                  }}
                  type="button"
                  disabled={user?.payload?.userCopy?.houses?.some(
                    (house) => house._id === item._id
                  )}
                >
                  Rent
                </button>
              </ul>
            ))}
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
