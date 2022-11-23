import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./views/home";
import Login from "./views/login";
import Signup from "./views/signup";
import Profile from "./views/profile";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
