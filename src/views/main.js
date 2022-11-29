import React from "react";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState(allData);
  const [search, setSearch] = useState(``);
  const handleSearch = (e) => {};

  useEffect(() => {
    axios("http://localhost:5005/house/houses")
      .then((response) => {
        //console.log(response.data); // get all the houses from the DB
        setAllData(response.data); // this is the way to change the value of allData
        setFilteredData(response.data);
      })
      .catch((error) => {
        console.log("Error getting fake data: " + error);
      });
  }, []);
  console.log("All data", allData);
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
          })
          .map((item) => (
            <li key={item._id}>
              <p>{item.name}</p>
              <p>Location: {item.location}</p>
              <p>Price per night: {item.pricepernight}</p>
              <p>
                Picture: <img src={item.photo} />
              </p>
            </li>
          ))}
      </div>
    </div>
  );
}
