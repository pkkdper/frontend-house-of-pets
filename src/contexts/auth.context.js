import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const API_URL = "http://localhost:5005";

const AuthContext = createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState()

  const navigate = useNavigate();

  const storeToken = (token) => {
    //  <==  ADD
    localStorage.setItem("authToken", token);
  };

  const getToken = () => {
    const storedToken = localStorage.getItem("authToken");
    return storedToken;
  };

  const authenticateUser = () => {
    //  <==  ADD
    // Get the stored token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // If the token exists in the localStorage
    if (storedToken) {
      // We must send the JWT token in the request's "Authorization" Headers
      axios
        .get(`${API_URL}/auth/verify`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          // If the server verifies that JWT token is valid
          const user = response.data;
          
          // Update state variables
          setIsLoggedIn(true);
          setIsLoading(false);
          setUser(user);
          setUserId(user.payload.userCopy._id)
        })
        .catch((error) => {
          // If the server sends an error response (invalid token)
          // Update state variables
          setIsLoggedIn(false);
          setIsLoading(false);
          setUser(null);
        });
    } else {
      // If the token is not available (or is removed)
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
    }
  };

  const removeToken = () => {
    localStorage.removeItem("authToken");
  };
  const logOutUser = () => {
    removeToken();
    authenticateUser();
    navigate("/");
  };

  useEffect(() => {
    //  <==  ADD
    authenticateUser();
  }, []);

  const updateUser = () => {
    axios
      .get(`http://localhost:5005/auth/profile/${userId}`)
      .then((response) => {
        setUser({ payload: { userCopy: response.data } });
      })

      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if(userId) {
      updateUser(); //get the route that gives us populated version
    }
  }, [userId])

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        storeToken,
        authenticateUser,
        removeToken,
        logOutUser,
        getToken,
        updateUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };
