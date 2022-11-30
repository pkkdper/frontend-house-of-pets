import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/auth.context";
import { Navigate, useNavigate } from "react-router-dom";

export default function App() {
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState(allData);
  const [search, setSearch] = useState(``);

  const handleSearch = (e) => {};
const {user, updateUser} = useContext(AuthContext)
const navigate = useNavigate()

const fetchHouses = () => {
  axios.get("http://localhost:5005/house/houses")
  .then((response) => {
    //console.log(response.data); // get all the houses from the DB
    setAllData(response.data); // this is the way to change the value of allData
    setFilteredData(response.data);
  })
  .catch((error) => {
    console.log("Error getting fake data: " + error);
  });
}
  useEffect(() => {
    fetchHouses()
  }, []);
  console.log("All data", allData);

  const handleAddHouse = async (id) => {
await axios.get(`http://localhost:5005/house/houses/renthouse/${id}/user/${user.payload.userCopy._id}`) ; 
updateUser()
// setIsDisabled(true)
// navigate("/auth/profile")
  }

  return (
    <div className="App">
      <div style={{ margin: "0 auto", marginTop: "10%" }}>
        <Navbar />
        <label>Search:</label>
        <input
          type="text"
          onChange={(event) => setSearch(event.target.value)}
        />
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
            if (item.photo === search) {
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
          })
          .map((item, index) => (
            <ul key={item._id}>
              <li>{item.name}</li>
              <li>Location: {item.location}</li>
              <li>Price per night: {item.pricepernight}</li>
              <li>Max numbers of days: {item.maxnumberofdays}</li>
              <li>Rooms: {item.rooms}</li>
              <li>Type: {item.type}</li>
              <button onClick={()=>{handleAddHouse(item._id)}} type="button" disabled={
                user.payload.userCopy.houses.some((house)=>house._id===item._id)
              }>Rent</button>
            </ul>
          ))}
      </div>
    </div>
  );
}

/* name: "Beautiful apartment",
location: "Peru",
pricepernight: 50,
maxnumberofdays: 7,
rooms: 3,
type: "Apartment",
animaltype: "Dog",
maxsizeofanimal: "Big",
maxnumberofanimals: 3,
photo: "picture", */
