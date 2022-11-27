import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
const API_URL = "http://localhost:5005";

const AuthContext = createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);


  const storeToken = (token) => {       //  <==  ADD
    localStorage.setItem('authToken', token);
    setIsLoggedIn(true);
  }

  const removeToken = (token) => {       //  <==  ADD
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        storeToken,
        removeToken
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthProviderWrapper, AuthContext };
