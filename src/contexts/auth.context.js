// import React, { useState, useEffect } from 'react';
// import axios from "axios";
// import { AuthProviderWrapper } from "./contexts/auth.context";



// const API_URL = "http://localhost:5005";

// const AuthContext = React.createContext();


// // functions for handling the authentication status {isLoggedIn, isLoading, user}

// const login = () => {
//     setAuth(prevState => ({
//         ...prevState,
//         isLoggedIn: true
//     }));


//     const logOut = () => {
//         setAuth(prevState => ({
//             ...prevState,
//             isLoggedIn: false
//         }));



//         return (
//             <AuthContext.Provider value={{ isLoggedIn, isLoading, user }}>
//                 {props.children}
//             </AuthContext.Provider>
//         )

//     }



//     export { AuthContext, AuthProviderWrapper };