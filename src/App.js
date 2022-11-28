import "./App.css";
import { NavLink, Route, Routes } from "react-router-dom";
import Home from "./views/home";
import Login from "./views/login";
import Signup from "./views/signup";
import Profile from "./views/profile";
import { useContext } from "react";
import { AuthContext } from "./contexts/auth.context";

function App() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <div className="App">
      {/* {isAuthenticated ? (
        <NavLink to="/profile">Profile</NavLink>
      ) : (
        <NavLink to="/login">Login</NavLink>
      )} */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
