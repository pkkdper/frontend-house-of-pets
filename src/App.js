import "./App.css";
import { NavLink, Route, Routes } from "react-router-dom";
import Animal from "./views/animal";
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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/profile" element={<Profile />} />
        <Route path="/auth/animal" element={<Animal />} />
      </Routes>
    </div>
  );
}

export default App;
